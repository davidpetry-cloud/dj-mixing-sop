# DJ Mixing SOP

[![test](https://github.com/davidpetry-cloud/dj-mixing-sop/actions/workflows/test.yml/badge.svg)](https://github.com/davidpetry-cloud/dj-mixing-sop/actions/workflows/test.yml)

Standard operating procedure for running a DJ source through a two-sub,
two-main FOH rig — patching, gain staging, sub matching, and teardown, where
every step carries a record of who verified it.

Written and engineered for FOH operations by David Petry.

## The rig

Two-channel Allen & Heath analog console, Yorkville powered mains, two
powered subs of **different models** split left and right. A physically
different, simpler system from the [Live Sound EQ SOP](https://github.com/davidpetry-cloud/live-sound-eq-sop)'s
Allen & Heath WZ3 — that rig routes subs through the console's internal
aux-fed-sub feature; this one runs full-range XLR pass-through to standalone
powered subs matched and crossed over at the box.

## Two operating modes

- **Mode A — Guest DJ.** Someone else spins; you engineer from FOH.
- **Mode B — You are the DJ.** You run the music and can't ride faders —
  set-and-forget, dialled in during setup with headroom left in.

An **EDM overlay** layers on top of either mode without duplicating the core
procedure — same gain-staging and sub-matching steps, six additional
considerations for hyper-compressed, sustained-sub-load material.

## Provenance

Every step and every troubleshooting row is attested by a named practitioner
with a stated basis and a verification date, using
[`attestation-ledger`](https://www.npmjs.com/package/attestation-ledger) —
the same published engine that governs the Live Sound EQ SOP. Nothing here
is proposed; this document shipped from real field practice, not from a
model's inference.

That's also the point being demonstrated: the same attestation rule now
governs two genuinely different rigs, written by two different people at
different times, enforced by code neither project can see into. The rule
doesn't care what the record is about.

## Running it

ES module imports, so it needs HTTP, not `file://`:

```bash
npm install
npm run preview     # builds, then serves public/ as the site root
```

## Development

```bash
npm test             # 18 tests
```

Tests cover: every attested record resolves as attested and names a
practitioner, basis, and date; no duplicate step or troubleshooting ids;
mode tagging is valid and Mode B's set-and-forget steps stay scoped to their
own section; the EDM overlay layers on top of core steps rather than
duplicating them; the rig description matches the two-sub, two-main system
rather than the WZ3's aux-fed-sub feature.

## Known gaps

- This is a procedural SOP, not a channel EQ reference — there is no console
  strip data here, deliberately. For channel-level EQ, see the WZ3 project.
- The troubleshooting table and procedure steps are drawn from one
  practitioner's field notes on one rig. As with the EQ SOP, the honest
  limitation is a single-contributor dataset until more practitioners weigh
  in through the same attestation model.

## License

MIT — see [LICENSE](LICENSE).

Starting points from real field practice, not guarantees. Every room and rig
is different. Log what worked and start there next time.
