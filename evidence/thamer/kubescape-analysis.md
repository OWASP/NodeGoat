# Kubescape Security Assessment — NodeGoat

## 1. Scan overview

- Tool: Kubescape v4.0.17
- Cluster: kind-nodegoat-calico
- Scan date: 2026-11-07
- Global compliance score: 83.20%
- NSA compliance: 80%
- MITRE compliance: 74.04%
- Coverage: 46/48 controls (86.83%)
- Passed resources: 96
- Failed resources: 6
- Failed controls: 11
  - High: 3
  - Medium: 8

The scan is marked as degraded. Two controls were not evaluated
because Kubescape operator host data was unavailable.

## 2. Confirmed security controls

The following controls passed:

- C-0013: Non-root containers
- C-0017: Immutable container filesystem
- C-0057: Privileged container protection
- C-0260: Network policies
- C-0030: Ingress and egress restrictions
- C-0270: CPU limits
- C-0271: Memory limits

NetworkPolicy tests confirmed that NodeGoat can access MongoDB,
while an unauthorized test Pod cannot access MongoDB or DNS.

## 3. Failed controls

| Control | Severity | Failed resources |
|---|---|---:|
| C-0002 | Medium | 2 |
| C-0007 | Medium | 4 |
| C-0015 | High | 3 |
| C-0031 | Medium | 2 |
| C-0035 | Medium | 2 |
| C-0037 | Medium | 2 |
| C-0053 | Medium | 1 |
| C-0063 | Medium | 2 |
| C-0187 | High | 2 |
| C-0188 | Medium | 2 |
| C-0262 | High | 1 |

## 4. Findings analysis

### Kubernetes system RBAC

Most failed controls are associated with built-in Kind
cluster roles and bindings:

- kubeadm:cluster-admins
- system:masters
- system:kube-controller-manager
- system:kube-scheduler

These permissions are part of the laboratory cluster's
administrative and control-plane configuration.
They were not modified because removing them could affect
cluster operation.

### C-0053 — Access container service account

Kubescape identified the following RBAC objects:

- ServiceAccount: nodegoat-sa
- Role: nodegoat-readonly
- RoleBinding: nodegoat-readonly-binding

The Role grants only get, list and watch on Pods and Services.

Tests confirmed:
- Listing Pods: allowed
- Reading Services: allowed
- Reading Secrets: denied
- Updating Deployments: denied

The NodeGoat Deployment uses the default ServiceAccount
with automountServiceAccountToken=false.

The Kubescape rule failed, but its report does not provide
a detailed sub-status explaining the reason.
This finding is documented and not treated as a confirmed
privilege escalation.

### C-0262 — Anonymous access enabled

The system:public-info-viewer ClusterRole grants GET access
to health and version endpoints.

Its binding includes system:authenticated and
system:unauthenticated.

This is a limited public API exposure in the Kind cluster.
No access to application Secrets was demonstrated.

The Kubernetes default role was retained to avoid
unnecessary modification of cluster system configuration.

## 5. Limitations

- The scan coverage is 46/48 controls.
- Kubescape operator host data was unavailable.
- The scan includes cluster-level resources, not only
  NodeGoat application resources.
- Some findings concern built-in Kind system RBAC.
- MongoDB and Node.js use legacy versions and require
  a planned upgrade assessment.

## 6. Conclusion

NodeGoat demonstrates non-root execution, read-only
container filesystems, resource limits, NetworkPolicies
and restricted RBAC.

The remaining Kubescape findings are documented.
System-level permissions were not weakened to improve
the compliance score.

Further validation is recommended after upgrading the
laboratory cluster and enabling complete Kubescape coverage.
