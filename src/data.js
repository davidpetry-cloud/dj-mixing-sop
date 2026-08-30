/**
 * DJ Mixing SOP — data model
 *
 * A different rig, a different problem shape from the channel EQ SOP.
 * There are no channels or EQ bands here. This document is procedural:
 * ordered steps, a troubleshooting table, and two operating modes layered
 * on top of a genre variant. The record shapes reflect that.
 *
 * Every attestable record reuses attestation-ledger unchanged — same
 * engine, same rule, second real project now, not just a second domain
 * inside one project.
 */

/**
 * The rig itself. A fact block, not attested — hardware isn't testimony.
 * Deliberately simple: two subs, two mains, no console-internal
 * aux-fed-sub feature in play. A different physical system from the
 * WZ3 rig documented in live-sound-eq-sop; both are real, run at
 * different gigs.
 */
export const RIG = {
  console: "16-channel Allen & Heath analog console",
  mains: "Yorkville powered tops, fed via snake returns A/B",
  subs: "Two powered subs, different models, split left/right. XLR thru is full-range pass-through — not high-passed.",
  monitors: "Powered wedges — not used for the DJ unless deployed as a booth monitor",
  snake: "20-channel: 16 sends / 4 returns",
  modes: {
    A: "Guest DJ — someone else spins, you engineer from FOH",
    B: "You are the DJ — you run the music and can't ride faders, set-and-forget"
  }
};

const BASIS =
  "David Petry's years of music and creative related experiences into live " +
  "audio engineering and other technical endeavors.";
const DATE = "2026-08-30";

function attested(extra = "") {
  return {
    source: "practitioner",
    by: "David Petry",
    role: "FOH engineer",
    basis: extra ? `${BASIS} ${extra}` : BASIS,
    verified: DATE,
    ttlDays: 730
  };
}

/**
 * PROCEDURES — ordered steps within a section. Each step is independently
 * attestable, tagged by which mode(s) it applies to, and optionally by
 * genre variant. "both" means Mode A and Mode B; "edm" is the overlay
 * from Section 8, layered on top rather than duplicated.
 */
export const SECTIONS = [
  {
    id: "setup",
    n: 1,
    title: "Pre-Show Setup & Patching",
    steps: [
      {
        id: "setup-source",
        text: "Sum stereo to mono at the source when possible — set the controller or software to MONO output, then a plain dual-RCA to 1/4\" adapter works with no summing electronics needed.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "setup-no-y-splitter",
        text: "If the source can't be set to mono, use a stereo-to-mono summing adapter — never a plain wired-together Y-splitter, which ties L and R together and can drop level.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "setup-stereo-pair",
        text: "For true stereo instead of mono: two adjacent line-in channels, first hard LEFT, second hard RIGHT, faders moved together as a pair. Keep gain, fader, EQ and pan identical on both — any mismatch pulls the image to one side.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "setup-di",
        text: "DJ on stage: put a DI after the summing adapter. It converts to balanced, adds a ground lift, and lets the snake carry a clean line to FOH.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "setup-balanced-source",
        text: "Balanced XLR source: skip the DI, patch straight to the snake. Pad at the stage box first if it has one; only trim at the mixer if still clipping with the pad engaged. Beyond roughly 50 ft, balanced XLR only, regardless of source type.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "setup-unbalanced-source",
        text: "Unbalanced RCA source: convert through a 2-channel DI before the snake. Pad at the DI by default, not the mixer, to keep the mixer's output clean and give one predictable adjustment point at the stage box.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "setup-fixed-pad-logic",
        text: "Working a single fixed-step DI pad: pad out, check for clipping. Clean means done. Still clipping means engage the pad and recheck. Still clipping with the pad engaged means trim at the mixer — the pad alone can't fix it. Clean with the pad out but distorting with it in means the pad wasn't needed; disable it and trim slightly at the source instead.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "setup-no-pad-switch",
        text: "No pad switch on the stage box: gain staging shifts entirely to source and downstream trim. Watch the input meter or clip light, not your ears — balanced XLR at hot pro line level can clip an input stage even when it sounds fine at the source.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "setup-gain-target",
        text: "-6 dB is the safer working trim target for DJ program material — it's dense, compressed, hot content with little dynamic range, so the standard -12 dB nominal headroom used for other sources runs the channel too cold. Set this during the loudest, densest section of the material, not a quiet intro.",
        modes: ["both"],
        attestation: attested()
      }
    ]
  },
  {
    id: "gain-staging",
    n: 2,
    title: "Gain Staging a Pre-Mixed Source",
    steps: [
      {
        id: "gain-source-device",
        text: "Set the source device first: controller master around 80-85%, or laptop volume around 75-90%. Clean and healthy, not slammed into the device's own limiter.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "gain-pfl-trim",
        text: "PFL the DJ channel. Raise GAIN so the loudest, densest material sits around -6 dB on the meter. Treat 0 dB as the ceiling, not the setting, with the channel fader at unity.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "gain-hpf-off",
        text: "Leave the DJ channel HPF switch off. It strips the lows before the mix bus, which starves the sub — DJ music needs those lows in the mix.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "gain-room-fill",
        text: "Re-check once the room fills. Bodies absorb high end, so nudge the master up rather than re-trimming the channel.",
        modes: ["both"],
        attestation: attested()
      }
    ]
  },
  {
    id: "subs",
    n: 3,
    title: "Subwoofers — Matching, Crossover & Placement",
    steps: [
      {
        id: "subs-mismatch-reality",
        text: "Two different subs means different sensitivity, different port tuning and extension, and possibly different internal DSP latency. They must be matched by ear, not by knob position, and each side of the room genuinely sounds different in the low end.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "subs-level-match",
        text: "Level-match before anything else: play a familiar bass-heavy track on repeat, power down one sub and set the other to a clean working level, then bring the second sub up to match that same loudness from the same listening position. Run both together and walk the room.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "subs-weaker-ceiling",
        text: "The weaker sub sets the ceiling. Do not push the smaller or less capable box to match the bigger one — it will distort and fail first.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "subs-crossover",
        text: "Match each sub's low-pass filter to the mains' high-pass filter at the same frequency. Start at 100 Hz. Heavy bass straining the mains: try 120 Hz. Boomy, locatable sub, or muddy vocals: drop to 80 Hz. Set around the more limited sub's capability, not the better one's.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "subs-polarity",
        text: "Test polarity empirically, don't assume it. Play bass-heavy material, flip one sub's polarity switch, keep whichever position gives the fuller, stronger low end. Do the same check for subs-vs-mains at the crossover point. A noticeably thinner result after flipping means the wrong setting — revert.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "subs-placement",
        text: "Split left/right creates a louder center power alley and thinner bass toward the sides — the common trade-off for a symmetrical stage look. Keep both subs on the floor for boundary loading, and try to match distance and boundary conditions between them so the room isn't fighting the level-matching work.",
        modes: ["both"],
        attestation: attested()
      }
    ]
  },
  {
    id: "tonal",
    n: 4,
    title: "Tonal Shaping (House Curve)",
    steps: [
      {
        id: "tonal-shape-gently",
        text: "Modern DJ tracks are mastered loud and full-range — shape gently, don't carve. A light smile curve, a touch of sub-supported low and a little air on top, suits dance music.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "tonal-boomy-room",
        text: "Boomy room: cut low-mids around 200-400 Hz on the DJ channel or master EQ before adding anything. Harsh top end: ease it back rather than piling on more low end to compensate.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "tonal-no-mc",
        text: "No MC mic in this SOP — the whole source is music, so there is no HPF or feedback juggling to manage.",
        modes: ["both"],
        attestation: attested()
      }
    ]
  },
  {
    id: "protection",
    n: 5,
    title: "Level, SPL & System Protection",
    steps: [
      {
        id: "protection-thermal-load",
        text: "DJ sets are long, loud and constant — far more sustained thermal load on powered boxes than a dynamic band.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "protection-limiters-not-mixing",
        text: "Keep the console mix bus out of clip. The powered speakers' limiters are a safety net, not a mixing tool. Check SPL at 2-3 room positions before the crowd builds.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "protection-weaker-sub-ceiling",
        text: "With mismatched boxes, one limiter engages before the other — that box is the ceiling for the night. If it's working hard, back the whole system off.",
        modes: ["both"],
        attestation: attested()
      }
    ]
  },
  {
    id: "monitoring",
    n: 6,
    title: "DJ Monitoring (Mains-Only Setup)",
    steps: [
      {
        id: "monitoring-headphones",
        text: "This rig is mains-only for the DJ. Cueing the next track is DJ headphones off the controller or software, standard practice — not the PA. Room reference is the mains.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "monitoring-wedge-option",
        text: "If the DJ can't hear the mix from the decks, deploy one powered wedge as a booth monitor, fed from a spare post-fader aux, placed at the DJ position, just loud enough to catch the beat. This uses a snake monitor return — plan routing before the show.",
        modes: ["both"],
        attestation: attested()
      }
    ]
  },
  {
    id: "mode-b",
    n: 7,
    title: "Mode B — You Are the DJ (Set-and-Forget)",
    steps: [
      {
        id: "modeb-dial-in-early",
        text: "Can't ride the master from behind the decks — dial it in during setup and leave headroom.",
        modes: ["B"],
        attestation: attested()
      },
      {
        id: "modeb-reference-soundcheck",
        text: "Reference-track soundcheck: play one bass-heavy track and one vocal track, set crossover, sub level and master so both sit right.",
        modes: ["B"],
        attestation: attested()
      },
      {
        id: "modeb-track-consistency",
        text: "Use software or controller gain (or auto-gain) so songs don't jump in level with no engineer to catch them. Engage available limiting as a safety net.",
        modes: ["B"],
        attestation: attested()
      },
      {
        id: "modeb-conservative",
        text: "Set conservative. A set that runs a few dB under max all night beats one that clips or cooks a driver mid-party.",
        modes: ["B"],
        attestation: attested()
      }
    ]
  },
  {
    id: "edm",
    n: 8,
    title: "Genre Variant — Mixing an EDM DJ",
    note: "Everything above still applies. EDM changes how hard the system is pushed and where the risk sits, not the patch. These steps layer on top.",
    steps: [
      {
        id: "edm-soundcheck-on-drop",
        text: "Set levels during the highest-energy section of an actual track — a drop, not a breakdown. Dial in on a quiet section and the drop arrives 6-10 dB louder, clipping the board or slamming every limiter in the chain.",
        modes: ["both"],
        variant: "edm",
        attestation: attested()
      },
      {
        id: "edm-brickwall-gain",
        text: "EDM is brickwall-limited — meters sit pinned with almost no visible peaks. Set trim so the loudest sustained level peaks near 0, rather than chasing transients that aren't there. Ask the DJ to keep their own master around 80% — distortion from a red-lined DJ master arrives already baked in and cannot be fixed downstream.",
        modes: ["both"],
        variant: "edm",
        attestation: attested()
      },
      {
        id: "edm-sustained-sub-load",
        text: "EDM carries sustained sub-bass, not just kick transients — continuous thermal load, not peaks, is what kills drivers. Engage a subsonic filter if either sub has one; content below roughly 35-40 Hz that the box can't reproduce only burns excursion. Watch both limiter LEDs all night — a limiter pumping regularly by hour two means back off then, not later.",
        modes: ["both"],
        variant: "edm",
        attestation: attested()
      },
      {
        id: "edm-less-eq",
        text: "EDM is already mastered with an aggressive low-end curve. Skip the smile curve — adding low end here just adds mud. Cut problems rather than boosting anything.",
        modes: ["both"],
        variant: "edm",
        attestation: attested()
      },
      {
        id: "edm-electrical-load",
        text: "Two powered subs plus powered tops running near-continuous output pulls real current. Check the circuit before doors and split the subs across two circuits if possible — a tripped breaker mid-set is a worse night than a slightly quieter PA.",
        modes: ["both"],
        variant: "edm",
        attestation: attested()
      },
      {
        id: "edm-monitoring-expectation",
        text: "EDM DJs beatmatch and ride EQs by ear far more than a playlist DJ. Expect a booth-monitor request and decide in advance whether to deploy a wedge on a spare aux, since it costs a snake return.",
        modes: ["both"],
        variant: "edm",
        attestation: attested()
      }
    ]
  },
  {
    id: "teardown",
    n: 10,
    title: "Teardown",
    steps: [
      {
        id: "teardown-power-order",
        text: "Master down first. Power down the powered speakers, both subs and mains, before the mixer — this avoids a thump through live drivers. Power-up order next time is the reverse: mixer and sources first, powered speakers last.",
        modes: ["both"],
        attestation: attested()
      },
      {
        id: "teardown-log-settings",
        text: "Log the crossover point and both sub levels that worked — it's the starting point next time.",
        modes: ["both"],
        attestation: attested()
      }
    ]
  }
];

/**
 * TROUBLESHOOTING — symptom, likely cause, fix. Each row independently
 * attestable, same as the channel-EQ SOP's philosophy: a fix that hasn't
 * been verified against a real symptom is a hypothesis, not a reference.
 */
export const TROUBLESHOOTING = [
  {
    id: "ts-hum",
    symptom: "Hum / buzz (60 Hz)",
    cause: "Ground loop from RCA / laptop on AC",
    fix: "Laptop on battery; ground-loop isolator; DI with ground lift",
    attestation: attested()
  },
  {
    id: "ts-no-signal",
    symptom: "No signal",
    cause: "Wrong channel, fader down, muted, not routed to Main, or source not playing",
    fix: "PFL to confirm signal at the channel; check fader, mute, Main assign",
    attestation: attested()
  },
  {
    id: "ts-one-side-thin",
    symptom: "One side only / thin",
    cause: "Wrong 1/8\" adapter, loose RCA, or pan error",
    fix: "Use 1/8\"-stereo to dual-1/4\"; reseat RCA; check pan / stereo",
    attestation: attested()
  },
  {
    id: "ts-distortion",
    symptom: "Distortion",
    cause: "Source master too hot, board trim too high, or speaker limiting",
    fix: "PFL-meter each stage; lower whichever is clipping",
    attestation: attested()
  },
  {
    id: "ts-boomy",
    symptom: "Boomy / muddy",
    cause: "Crossover too high, sub too hot, or room mode",
    fix: "Drop crossover toward 80-100 Hz; trim sub; cut 200-400 Hz",
    attestation: attested()
  },
  {
    id: "ts-weak-bass",
    symptom: "Weak / missing bass",
    cause: "Crossover too low, sub polarity flipped, sub level low, or DJ channel HPF engaged",
    fix: "Raise crossover toward 100 Hz; flip sub polarity; raise sub; switch DJ channel HPF off",
    attestation: attested()
  },
  {
    id: "ts-uneven-bass",
    symptom: "Bass heavier on one side of room",
    cause: "Subs not level-matched, or unequal boundary/corner loading",
    fix: "Re-run the one-at-a-time match; even up placement",
    attestation: attested()
  },
  {
    id: "ts-cancellation",
    symptom: "Less bass with both subs than one",
    cause: "Subs out of polarity with each other — cancellation",
    fix: "Flip one sub's polarity; keep the fuller-sounding position",
    attestation: attested()
  },
  {
    id: "ts-early-limiting",
    symptom: "One sub limiting early / running hot",
    cause: "Weaker box pushed to match the stronger one",
    fix: "Set the pair to the weaker sub's clean ceiling",
    attestation: attested()
  },
  {
    id: "ts-breaker-trip",
    symptom: "Breaker trips mid-set (EDM)",
    cause: "Sustained draw from two subs and tops on one circuit",
    fix: "Split subs across circuits; reduce overall level",
    attestation: attested()
  },
  {
    id: "ts-track-level-jumps",
    symptom: "Level jumps between tracks (Mode B)",
    cause: "Uneven per-track gain",
    fix: "Use software/controller gain or auto-gain",
    attestation: attested()
  },
  {
    id: "ts-di-clip-with-pad",
    symptom: "DI / input clipping even with pad engaged",
    cause: "Source itself is hotter than the DI's fixed pad can tame",
    fix: "Trim at the mixer's master/booth output instead of relying on the DI pad alone",
    attestation: attested()
  },
  {
    id: "ts-thin-with-pad",
    symptom: "Thin sound or audible noise floor with DI pad engaged",
    cause: "Pad wasn't actually needed — unnecessary attenuation hurting signal-to-noise",
    fix: "Disable the pad; trim slightly at the source instead",
    attestation: attested()
  },
  {
    id: "ts-no-pad-switch-hot",
    symptom: "Hot signal into a stage box with no pad switch",
    cause: "No line of defense at the stage box — mixer output level is the only adjustment point",
    fix: "Trim mixer master/booth conservatively; use the receiving end's input trim as a second stage; watch the clip LED, not your ears",
    attestation: attested()
  },
  {
    id: "ts-clip-despite-clean-headphones",
    symptom: "Clipping despite a clean-sounding source in headphones",
    cause: "Balanced XLR line level overloading a receiving console/amp input stage",
    fix: "Check the actual input meter/clip light at the receiving end, not the source's own output",
    attestation: attested()
  }
];

/** All records that carry an attestation — for tally, filtering, iteration. */
export function allProcedures() {
  return SECTIONS.flatMap((section) =>
    section.steps.map((step) => ({ ...step, section: section.title, sectionId: section.id }))
  );
}

export function allAttestableRecords() {
  return [...allProcedures(), ...TROUBLESHOOTING];
}

export function sectionById(id) {
  return SECTIONS.find((s) => s.id === id) ?? null;
}

/** Steps that apply to a given mode ("A" or "B") — "both" always included. */
export function stepsForMode(mode) {
  return allProcedures().filter((s) => s.modes.includes("both") || s.modes.includes(mode));
}

/** The EDM overlay only — steps that layer on top of the core procedure. */
export function edmOverlay() {
  return allProcedures().filter((s) => s.variant === "edm");
}
