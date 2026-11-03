#!/usr/bin/env python3

import json
import sys
from pathlib import Path


def fail(message, code=2):
    print(f"ERREUR : {message}", file=sys.stderr)
    return code


def load_json(path):
    try:
        with open(path, encoding="utf-8") as file:
            return json.load(file)
    except (OSError, json.JSONDecodeError) as error:
        raise ValueError(f"Impossible de lire {path} : {error}")


def main():
    if len(sys.argv) != 3:
        return fail(
            "Usage: check-trivy-baseline.py <rapport.json> <baseline.json>"
        )

    try:
        report = load_json(sys.argv[1])
        baseline = load_json(sys.argv[2])
    except ValueError as error:
        return fail(str(error))

    if not isinstance(report, dict) or "Results" not in report:
        return fail("Format du rapport Trivy invalide.")

    if not isinstance(baseline, dict):
        return fail("Format du baseline invalide.")

    baseline_vulns = baseline.get("vulnerabilities")
    if not isinstance(baseline_vulns, list):
        return fail("Liste des vulnérabilités absente du baseline.")

    baseline_fingerprints = set()

    for item in baseline_vulns:
        if not isinstance(item, dict):
            return fail("Entrée invalide dans le baseline.")

        if item.get("severity") not in {"HIGH", "CRITICAL"}:
            return fail("Le baseline contient une sévérité inattendue.")

        fingerprint = item.get("fingerprint")
        if not isinstance(fingerprint, str) or not fingerprint.strip():
            return fail("Fingerprint manquant dans le baseline.")

        baseline_fingerprints.add(fingerprint)

    results = report.get("Results") or []
    if not isinstance(results, list):
        return fail("La section Results du rapport est invalide.")

    current = {}
    missing_fingerprints = 0

    for result in results:
        if not isinstance(result, dict):
            return fail("Résultat invalide dans le rapport Trivy.")

        vulnerabilities = result.get("Vulnerabilities") or []
        if not isinstance(vulnerabilities, list):
            return fail("Liste de vulnérabilités invalide.")

        for vuln in vulnerabilities:
            if not isinstance(vuln, dict):
                return fail("Entrée de vulnérabilité invalide.")

            if vuln.get("Severity") not in {"HIGH", "CRITICAL"}:
                continue

            fingerprint = vuln.get("Fingerprint")
            if not isinstance(fingerprint, str) or not fingerprint.strip():
                missing_fingerprints += 1
                continue

            current.setdefault(
                fingerprint,
                (vuln, result.get("Target", "cible inconnue"))
            )

    if missing_fingerprints:
        return fail(
            f"{missing_fingerprints} vulnérabilité(s) HIGH/CRITICAL "
            "sans fingerprint. Comparaison impossible."
        )

    new_findings = [
        (fingerprint, data)
        for fingerprint, data in current.items()
        if fingerprint not in baseline_fingerprints
    ]

    print(f"Baseline : {len(baseline_fingerprints)} empreintes")
    print(f"Rapport actuel : {len(current)} empreintes HIGH/CRITICAL")

    if new_findings:
        print(f"\nÉCHEC : {len(new_findings)} nouvelle(s) vulnérabilité(s) détectée(s).")

        for _, (vuln, target) in sorted(
            new_findings,
            key=lambda item: (
                item[1][0].get("Severity", ""),
                item[1][0].get("VulnerabilityID", "")
            )
        ):
            print(
                f"- {vuln.get('Severity')} | "
                f"{vuln.get('VulnerabilityID', 'ID inconnu')} | "
                f"{vuln.get('PkgName', 'package inconnu')}@"
                f"{vuln.get('InstalledVersion', '?')} | "
                f"{target}"
            )

        return 1

    print("\nSUCCÈS : aucune nouvelle vulnérabilité HIGH/CRITICAL.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
