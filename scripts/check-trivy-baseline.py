#!/usr/bin/env python3

import json
import sys


def fail(message):
    print(f"ERREUR : {message}", file=sys.stderr)
    return 2


def load_json(path):
    try:
        with open(path, encoding="utf-8") as file:
            return json.load(file)
    except (OSError, json.JSONDecodeError) as error:
        raise ValueError(f"Impossible de lire {path} : {error}")


def required_text(data, field, context):
    value = data.get(field)

    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"Champ {field} manquant ou invalide : {context}")

    return value


def identity(vulnerability, target, context):
    return (
        required_text(vulnerability, "VulnerabilityID", context),
        required_text(vulnerability, "PkgName", context),
        required_text(vulnerability, "InstalledVersion", context),
        required_text({"Target": target}, "Target", context),
    )


def main():
    if len(sys.argv) != 3:
        return fail(
            "Usage: check-trivy-baseline.py <rapport.json> <baseline.json>"
        )

    try:
        report = load_json(sys.argv[1])
        baseline = load_json(sys.argv[2])

        if not isinstance(report, dict) or not isinstance(
            report.get("Results"), list
        ):
            raise ValueError("Format du rapport Trivy invalide.")

        if not isinstance(baseline, dict):
            raise ValueError("Format du baseline invalide.")

        baseline_vulns = baseline.get("vulnerabilities")

        if not isinstance(baseline_vulns, list):
            raise ValueError("Liste des vulnérabilités absente du baseline.")

        baseline_keys = set()

        for index, vuln in enumerate(baseline_vulns):
            if not isinstance(vuln, dict):
                raise ValueError(f"Entrée invalide dans le baseline : {index}")

            if vuln.get("severity") not in {"HIGH", "CRITICAL"}:
                raise ValueError("Sévérité inattendue dans le baseline.")

            key = (
                required_text(vuln, "vulnerability_id", f"baseline #{index}"),
                required_text(vuln, "package", f"baseline #{index}"),
                required_text(vuln, "installed_version", f"baseline #{index}"),
                required_text(vuln, "target", f"baseline #{index}"),
            )
            baseline_keys.add(key)

        current = {}

        for result_index, result in enumerate(report["Results"]):
            if not isinstance(result, dict):
                raise ValueError(f"Résultat Trivy invalide : {result_index}")

            vulnerabilities = result.get("Vulnerabilities") or []

            if not isinstance(vulnerabilities, list):
                raise ValueError("Liste de vulnérabilités invalide.")

            target = result.get("Target")

            for vuln_index, vuln in enumerate(vulnerabilities):
                if not isinstance(vuln, dict):
                    raise ValueError("Entrée de vulnérabilité invalide.")

                severity = vuln.get("Severity")

                if severity not in {"HIGH", "CRITICAL"}:
                    continue

                context = f"rapport, résultat #{result_index}, vulnérabilité #{vuln_index}"
                key = identity(vuln, target, context)
                current[key] = vuln

    except ValueError as error:
        return fail(str(error))

    new_findings = sorted(set(current) - baseline_keys)

    print(f"Baseline : {len(baseline_keys)} vulnérabilités connues")
    print(f"Rapport actuel : {len(current)} vulnérabilités HIGH/CRITICAL")

    if new_findings:
        print(
            f"\nÉCHEC : {len(new_findings)} nouvelle(s) "
            "vulnérabilité(s) détectée(s)."
        )

        for key in new_findings:
            vuln = current[key]

            print(
                f"- {vuln['Severity']} | {key[0]} | "
                f"{key[1]}@{key[2]} | {key[3]}"
            )

        return 1

    print("\nSUCCÈS : aucune nouvelle vulnérabilité HIGH/CRITICAL.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
