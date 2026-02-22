import { useMemo, useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

export default function K8sManifestBuilder() {
  const [name, setName] = useState('my-app')
  const [namespace, setNamespace] = useState('default')
  const [image, setImage] = useState('nginx:latest')
  const [replicas, setReplicas] = useState('2')
  const [containerPort, setContainerPort] = useState('80')
  const [servicePort, setServicePort] = useState('80')
  const { copied, copy } = useCopy()

  const yaml = useMemo(
    () => `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}
  namespace: ${namespace}
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${name}
  template:
    metadata:
      labels:
        app: ${name}
    spec:
      containers:
        - name: ${name}
          image: ${image}
          ports:
            - containerPort: ${containerPort}
---
apiVersion: v1
kind: Service
metadata:
  name: ${name}
  namespace: ${namespace}
spec:
  selector:
    app: ${name}
  ports:
    - protocol: TCP
      port: ${servicePort}
      targetPort: ${containerPort}
  type: ClusterIP`,
    [name, namespace, image, replicas, containerPort, servicePort]
  )

  return (
    <ToolShell icon="" title="K8s Manifest Builder" desc="Generate Deployment and Service YAML with common defaults.">
      <ControlsBar>
        <CopyBtn onClick={() => copy(yaml)} copied={copied} label="Copy YAML" />
      </ControlsBar>
      <StatusBadge type="info">Quick-start generator for Kubernetes deployment manifests.</StatusBadge>

      <div className="split-pane">
        <div style={{ display: 'grid', gap: 8 }}>
          <PanelLabel>Inputs</PanelLabel>
          <input className="text-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="App name" />
          <input className="text-input" value={namespace} onChange={(e) => setNamespace(e.target.value)} placeholder="Namespace" />
          <input className="text-input" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Container image" />
          <input className="text-input" value={replicas} onChange={(e) => setReplicas(e.target.value)} placeholder="Replicas" />
          <input className="text-input" value={containerPort} onChange={(e) => setContainerPort(e.target.value)} placeholder="Container port" />
          <input className="text-input" value={servicePort} onChange={(e) => setServicePort(e.target.value)} placeholder="Service port" />
        </div>
        <div>
          <PanelLabel>Generated YAML</PanelLabel>
          <pre className="output-area" style={{ minHeight: 340 }}>{yaml}</pre>
        </div>
      </div>
    </ToolShell>
  )
}
