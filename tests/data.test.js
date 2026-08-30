import { describe, it, expect } from "vitest";
import { resolveStatus, isTrusted, SOURCE, STATUS } from "attestation-ledger";
import {
  RIG,
  SECTIONS,
  TROUBLESHOOTING,
  allProcedures,
  allAttestableRecords,
  sectionById,
  stepsForMode,
  edmOverlay
} from "../src/data.js";

describe("the engine on a third project — the invariant travels", () => {
  it("resolves every attested procedure and troubleshooting row as attested", () => {
    for (const record of allAttestableRecords()) {
      expect(resolveStatus(record), `${record.id} did not resolve to attested`).toBe(STATUS.ATTESTED);
      expect(isTrusted(record)).toBe(true);
    }
  });

  it("names an attester, basis and date on every record", () => {
    for (const record of allAttestableRecords()) {
      const a = record.attestation;
      expect(a.source).toBe(SOURCE.PRACTITIONER);
      expect(a.by, `${record.id} is unsigned`).toBeTruthy();
      expect(a.basis, `${record.id} states no basis`).toBeTruthy();
      expect(a.verified, `${record.id} has no date`).toBeTruthy();
    }
  });

  it("carries no placeholder text — this project shipped with real testimony from the start", () => {
    for (const record of allAttestableRecords()) {
      expect(/PLACEHOLDER/i.test(record.attestation.basis)).toBe(false);
    }
  });
});

describe("structure", () => {
  it("has all ten sections numbered, including the two skipped by design", () => {
    // Section 9 (Troubleshooting) is its own top-level export, not a SECTIONS
    // entry — it has a different shape (symptom/cause/fix) than a procedure
    // step, so forcing it into the same array would blur the two record types.
    const numbers = SECTIONS.map((s) => s.n).sort((a, b) => a - b);
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 10]);
  });

  it("gives every section at least one step", () => {
    for (const section of SECTIONS) {
      expect(section.steps.length, `${section.title} has no steps`).toBeGreaterThan(0);
    }
  });

  it("has no duplicate step ids across the whole document", () => {
    const ids = allProcedures().map((s) => s.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes, `duplicate ids: ${dupes.join(", ")}`).toEqual([]);
  });

  it("has no duplicate troubleshooting ids", () => {
    const ids = TROUBLESHOOTING.map((r) => r.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it("gives every troubleshooting row a symptom, cause and fix", () => {
    for (const row of TROUBLESHOOTING) {
      expect(row.symptom, `${row.id} has no symptom`).toBeTruthy();
      expect(row.cause, `${row.id} has no cause`).toBeTruthy();
      expect(row.fix, `${row.id} has no fix`).toBeTruthy();
    }
  });
});

describe("mode tagging", () => {
  it("tags every step with a real mode value", () => {
    const valid = ["both", "A", "B"];
    for (const step of allProcedures()) {
      for (const m of step.modes) {
        expect(valid, `${step.id} has an unrecognised mode "${m}"`).toContain(m);
      }
    }
  });

  it("includes every 'both' step in both mode views", () => {
    const bothCount = allProcedures().filter((s) => s.modes.includes("both")).length;
    expect(stepsForMode("A").length).toBeGreaterThanOrEqual(bothCount);
    expect(stepsForMode("B").length).toBeGreaterThanOrEqual(bothCount);
  });

  it("gives Mode B its own set-and-forget steps not present for Mode A alone", () => {
    const modeBOnly = allProcedures().filter((s) => s.modes.includes("B") && !s.modes.includes("both"));
    expect(modeBOnly.length).toBeGreaterThan(0);
    for (const step of modeBOnly) {
      expect(step.sectionId).toBe("mode-b");
    }
  });
});

describe("the EDM overlay — layers on top rather than duplicating", () => {
  it("marks every edm-variant step as also applying to both DJ modes", () => {
    for (const step of edmOverlay()) {
      expect(step.modes, `${step.id} should still apply across modes`).toContain("both");
    }
  });

  it("keeps the overlay scoped to the edm section", () => {
    for (const step of edmOverlay()) {
      expect(step.sectionId).toBe("edm");
    }
  });

  it("does not duplicate core gain-staging or sub content inside the overlay", () => {
    const overlayIds = edmOverlay().map((s) => s.id);
    const coreIds = ["gain-pfl-trim", "subs-crossover", "subs-polarity"];
    for (const id of coreIds) {
      expect(overlayIds).not.toContain(id);
    }
  });
});

describe("the rig", () => {
  it("describes two subs and two mains, not the WZ3's aux-fed-sub feature", () => {
    expect(RIG.subs).toMatch(/two/i);
    expect(RIG.subs).toMatch(/full-range/i);
  });

  it("defines both operating modes", () => {
    expect(RIG.modes.A).toBeTruthy();
    expect(RIG.modes.B).toBeTruthy();
  });
});

describe("lookups", () => {
  it("finds a section by id", () => {
    expect(sectionById("subs")?.title).toBe("Subwoofers — Matching, Crossover & Placement");
  });

  it("returns null for an unknown section", () => {
    expect(sectionById("nonexistent")).toBeNull();
  });
});
