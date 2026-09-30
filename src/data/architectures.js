export const projectArchitectures = {
  'Cloud-Design': {
    title: 'AWS Cloud Architecture — ECS Fargate & Multi-AZ VPC',
    subtitle: 'Production Serverless Microservices Infrastructure as Code',
    badge: 'AWS Production (eu-west-3)',
    status: 'HEALTHY // 99.9% UPTIME',
    overview: 'A complete production microservices cloud infrastructure re-architected on AWS. Provisioned 100% declaratively using Terraform, featuring ECS Fargate serverless containers, Application Load Balancers, multi-AZ VPC with public/private subnets, target tracking auto-scaling, and structured CloudWatch monitoring.',
    network: {
      vpcCidr: '10.0.0.0/16',
      region: 'eu-west-3 (Paris)',
      azs: ['eu-west-3a', 'eu-west-3b'],
      publicSubnets: ['10.0.1.0/24 (AZ-A)', '10.0.2.0/24 (AZ-B)'],
      privateSubnets: ['10.0.10.0/24 (AZ-A)', '10.0.20.0/24 (AZ-B)'],
      gateway: 'Internet Gateway (IGW) + 2x Elastic IP NAT Gateways'
    },
    layers: [
      {
        name: 'Public Ingress Layer',
        icon: '🌐',
        details: 'Internet Gateway connects incoming HTTP/HTTPS traffic to an AWS Application Load Balancer across 2 Availability Zones. SSL/TLS termination and path-based routing rules route traffic to service target groups.'
      },
      {
        name: 'Application Tier (ECS Fargate)',
        icon: '⚡',
        details: 'Serverless container tasks running in isolated private subnets with zero direct internet access. Outbound traffic (e.g. pulling Docker images, external APIs) routes securely through NAT Gateways.'
      },
      {
        name: 'Auto-Scaling & Resilience',
        icon: '📈',
        details: 'Target-tracking scaling policies monitor CPU and memory utilization (70% threshold). Automatically scales ECS tasks from minimum 2 tasks up to 10 tasks during peak traffic load.'
      },
      {
        name: 'Observability & Security',
        icon: '🛡️',
        details: 'AWS CloudWatch structured log streaming, metric alarms for 5XX errors and container CPU spikes. Least-privilege IAM task execution roles and AWS KMS encryption for environment secrets.'
      }
    ],
    topologyNodes: [
      { id: 'client', label: 'Client / Users', type: 'external', icon: '👤', x: '10%', y: '50%' },
      { id: 'igw', label: 'Internet Gateway', type: 'network', icon: '🌍', x: '28%', y: '50%' },
      { id: 'alb', label: 'Multi-AZ ALB', type: 'ingress', icon: '⚖️', x: '46%', y: '50%' },
      { id: 'fargate_a', label: 'ECS Tasks (AZ-A)', type: 'compute', icon: '📦', x: '72%', y: '28%' },
      { id: 'fargate_b', label: 'ECS Tasks (AZ-B)', type: 'compute', icon: '📦', x: '72%', y: '72%' },
      { id: 'cloudwatch', label: 'AWS CloudWatch', type: 'telemetry', icon: '📊', x: '92%', y: '50%' }
    ],
    decisions: [
      {
        decision: 'ECS Fargate vs Self-Managed EC2 / EKS',
        rationale: 'Fargate completely removes EC2 instance management, OS security patching, and cluster control-plane overhead, cutting infrastructure costs significantly while retaining instant auto-scaling.'
      },
      {
        decision: 'Multi-AZ Private Subnet Isolation',
        rationale: 'Placing container tasks in private subnets with Security Groups allowing traffic only from the ALB target groups guarantees that no microservice container is directly addressable from the public internet.'
      },
      {
        decision: '100% Terraform Infrastructure as Code (IaC)',
        rationale: 'Modular Terraform state allows the entire multi-tier cloud environment to be deployed, inspected for configuration drift, or destroyed cleanly within minutes.'
      }
    ],
    codeSnippetTitle: 'terraform/ecs-fargate.tf',
    codeSnippet: `resource "aws_ecs_service" "api_microservice" {
  name            = "production-api"
  cluster         = aws_ecs_cluster.production.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.private_a.id, aws_subnet.private_b.id]
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "api"
    container_port   = 8080
  }
}`
  },

  'Code-Keeper': {
    title: 'DevSecOps & CI/CD Platform Architecture',
    subtitle: 'Automated Multi-Stage CI/CD with Self-Hosted GitLab & Ansible',
    badge: 'DevSecOps Automation',
    status: 'ACTIVE PIPELINE // 0 VULNERABILITIES',
    overview: 'Complete enterprise DevOps automation platform built with self-hosted GitLab CE and autoscaling runners configured via Ansible. Implements multi-stage CI/CD pipelines including automated unit/integration testing, Docker multi-stage builds, Trivy container security scanning, and automated Terraform infrastructure deployment.',
    network: {
      runners: 'Autoscaling Docker-in-Docker (dind) Executors',
      orchestration: 'Ansible Playbooks with Vault encryption',
      registries: 'Self-Hosted Container Registry + Docker Hub',
      securityTool: 'Trivy SAST/DAST + SonarQube quality gates'
    },
    layers: [
      {
        name: 'Ansible System Provisioning',
        icon: '⚡',
        details: 'Ansible playbooks automate the installation, configuration, and security hardening of the GitLab CE server and auto-scaling runner instances without manual SSH intervention.'
      },
      {
        name: 'Multi-Stage CI Pipeline',
        icon: '🔄',
        details: 'Every push triggers automated linting (ESLint, Go vet), unit test execution with coverage enforcement, and end-to-end integration validation.'
      },
      {
        name: 'DevSecOps Security Gate (Trivy)',
        icon: '🛡️',
        details: 'Images are audited at build time against the national CVE database using Trivy. The pipeline automatically fails if any High or Critical unmitigated CVEs are detected.'
      },
      {
        name: 'Zero-Downtime Rollouts',
        icon: '🚀',
        details: 'Deployment jobs authenticate with cloud credentials using GitLab CI masked variables, running automated Terraform plan/apply and rolling out updated containers.'
      }
    ],
    topologyNodes: [
      { id: 'commit', label: 'Developer Push', type: 'external', icon: '💻', x: '10%', y: '50%' },
      { id: 'gitlab', label: 'GitLab CE Server', type: 'network', icon: '🦊', x: '30%', y: '50%' },
      { id: 'runner', label: 'Ansible Runner', type: 'ingress', icon: '🏃', x: '50%', y: '50%' },
      { id: 'trivy', label: 'Trivy Security Gate', type: 'compute', icon: '🛡️', x: '72%', y: '28%' },
      { id: 'registry', label: 'Container Registry', type: 'compute', icon: '📦', x: '72%', y: '72%' },
      { id: 'deploy', label: 'Cloud Deployment', type: 'telemetry', icon: '☁️', x: '92%', y: '50%' }
    ],
    decisions: [
      {
        decision: 'Self-Hosted GitLab Runners with Ansible',
        rationale: 'Ensures dedicated computing power for high-intensity container image builds while keeping sensitive pipeline credentials strictly on internal infrastructure.'
      },
      {
        decision: 'Automated Shift-Left Security Scans',
        rationale: 'Catching vulnerabilities before artifact publication eliminates 90% of production security patch cycles.'
      },
      {
        decision: 'Idempotent Configuration Management',
        rationale: 'Ansible roles ensure any newly provisioned runner VM reaches the exact identical configuration state in under 3 minutes.'
      }
    ],
    codeSnippetTitle: '.gitlab-ci.yml — Security & Build Stages',
    codeSnippet: `stages:
  - test
  - security
  - build
  - deploy

trivy_security_scan:
  stage: security
  image: aquasec/trivy:latest
  script:
    - trivy image --exit-code 1 --severity CRITICAL,HIGH $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'`
  },

  'Orchestrator': {
    title: 'Multi-Node Kubernetes (K3s) Cluster Architecture',
    subtitle: 'Container Orchestration, High Availability & Ingress Routing',
    badge: 'Kubernetes Cluster',
    status: 'CLUSTER READY // 3 NODES ONLINE',
    overview: 'Resilient multi-node Kubernetes container orchestration cluster provisioned via Vagrant and Ansible. Features declarative manifest management, Traefik ingress routing, automated failover, liveness/readiness health probes, persistent storage volumes (PV/PVC), and zero-downtime rolling updates.',
    network: {
      cni: 'Flannel VXLAN Overlay Network',
      ingress: 'Traefik Reverse Proxy & Ingress Controller',
      nodes: '1 Master Control Plane Node + 2 Worker Nodes',
      storage: 'Local-Path Provisioner PersistentVolumeClaims'
    },
    layers: [
      {
        name: 'Control Plane Node',
        icon: '☸️',
        details: 'Runs the Kubernetes API server, scheduler, controller manager, and K3s embedded datastore, managing cluster state and scheduling pods across workers.'
      },
      {
        name: 'Worker Nodes & Pod Topology',
        icon: '📦',
        details: 'Distributed microservices pods running on Worker-1 and Worker-2. Pod anti-affinity rules prevent single points of failure by distributing duplicate replicas.'
      },
      {
        name: 'Traefik Ingress & Service Mesh',
        icon: '🔗',
        details: 'Receives external traffic, manages path-based routing, and load-balances requests across healthy backend pods using ClusterIP services.'
      },
      {
        name: 'Self-Healing & Health Probes',
        icon: '💓',
        details: 'Configured HTTP liveness and readiness probes restart stalled containers and ensure unready pods do not receive live traffic during deployments.'
      }
    ],
    topologyNodes: [
      { id: 'traffic', label: 'HTTP Traffic', type: 'external', icon: '🌐', x: '10%', y: '50%' },
      { id: 'traefik', label: 'Traefik Ingress', type: 'network', icon: '🚦', x: '30%', y: '50%' },
      { id: 'service', label: 'K8s ClusterIP', type: 'ingress', icon: '🔀', x: '50%', y: '50%' },
      { id: 'pod1', label: 'Pod Replica 1 (Node A)', type: 'compute', icon: '☸️', x: '72%', y: '28%' },
      { id: 'pod2', label: 'Pod Replica 2 (Node B)', type: 'compute', icon: '☸️', x: '72%', y: '72%' },
      { id: 'pvc', label: 'Persistent Storage', type: 'telemetry', icon: '💾', x: '92%', y: '50%' }
    ],
    decisions: [
      {
        decision: 'K3s Lightweight Distribution',
        rationale: 'K3s delivers full CNCF-certified Kubernetes compliance while consuming less than 512MB RAM per node, ideal for edge and lean multi-node environments.'
      },
      {
        decision: 'RollingUpdate with maxUnavailable: 0',
        rationale: 'Guarantees that new container pods are initialized, passing readiness probes, and accepting traffic BEFORE old pods are terminated.'
      },
      {
        decision: 'Automated Vagrant + Ansible Cluster Spin-Up',
        rationale: 'A single command brings up the complete 3-node cluster with network overlay, joined tokens, and ingress manifests in under 5 minutes.'
      }
    ],
    codeSnippetTitle: 'k8s/deployment.yaml — Zero-Downtime Rolling Update',
    codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: microservice-deployment
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: app
        image: microservice:v2.1
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5`
  },

  'Play With Containers': {
    title: 'Distributed Event-Driven Microservices Architecture',
    subtitle: 'Containerized Microservices with RabbitMQ & Isolated Databases',
    badge: 'Microservices & Event Broker',
    status: 'ACTIVE CONTAINERS // ISOLATED NETWORKS',
    overview: 'Decoupled microservices architecture utilizing an API Gateway single entry point, isolated database-per-service pattern with PostgreSQL, and asynchronous message brokering via RabbitMQ for resilient order billing and inventory processing.',
    network: {
      networkType: 'Docker Custom Bridge Network (isolated backend)',
      messageBroker: 'RabbitMQ with AMQP channel management',
      databases: 'Dedicated PostgreSQL instances per microservice',
      volumes: 'Docker Named Volumes for durable persistence'
    },
    layers: [
      {
        name: 'API Gateway Entrypoint',
        icon: '🚪',
        details: 'Exposed on port 3000 to clients. Routes incoming requests to backend services, isolates internal container ports, and provides request logging.'
      },
      {
        name: 'Inventory Microservice',
        icon: '🎬',
        details: 'Python Flask application with dedicated PostgreSQL database. Handles catalog queries, updates, and stock availability verification.'
      },
      {
        name: 'RabbitMQ Message Broker',
        icon: '🐇',
        details: 'Decouples synchronous inventory requests from asynchronous billing operations. Emits billing events onto durable queues with consumer acknowledgments.'
      },
      {
        name: 'Billing Microservice Worker',
        icon: '💳',
        details: 'Asynchronously consumes billing events from RabbitMQ, processes payment states, and commits transactional records to its own PostgreSQL database.'
      }
    ],
    topologyNodes: [
      { id: 'client', label: 'Client App', type: 'external', icon: '📱', x: '10%', y: '50%' },
      { id: 'gateway', label: 'API Gateway (3000)', type: 'network', icon: '🚪', x: '30%', y: '50%' },
      { id: 'inventory', label: 'Inventory Service', type: 'ingress', icon: '🎬', x: '52%', y: '28%' },
      { id: 'rabbitmq', label: 'RabbitMQ Broker', type: 'ingress', icon: '🐇', x: '52%', y: '72%' },
      { id: 'billing', label: 'Billing Worker', type: 'compute', icon: '💳', x: '75%', y: '72%' },
      { id: 'dbs', label: 'PostgreSQL DBs', type: 'telemetry', icon: '🗄️', x: '92%', y: '50%' }
    ],
    decisions: [
      {
        decision: 'Database-Per-Service Pattern',
        rationale: 'Prevents database-level coupling. Inventory and Billing schemas evolve independently, ensuring failure in one service never locks tables in the other.'
      },
      {
        decision: 'Asynchronous Event Brokering via RabbitMQ',
        rationale: 'Protects user response times. Order submission returns immediate acknowledgment while heavy billing and invoicing compute asynchronously.'
      },
      {
        decision: 'Custom Docker Bridge Network Isolation',
        rationale: 'Databases are never exposed to the host machine. Only the API Gateway exposes port 3000, enforcing network least-privilege.'
      }
    ],
    codeSnippetTitle: 'docker-compose.yml — Event-Driven Microservices',
    codeSnippet: `services:
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    networks:
      - microservices-net

  rabbit-queue:
    image: rabbitmq:3-management-alpine
    networks:
      - microservices-net

  billing-app:
    build: ./billing-service
    depends_on:
      - rabbit-queue
      - billing-db
    networks:
      - microservices-net`
  },

  'Social Network': {
    title: 'Full Stack Real-Time Social Platform Architecture',
    subtitle: 'High-Concurrency Go Backend with WebSockets & Vue.js 3',
    badge: 'Real-Time Full Stack',
    status: 'WEBSOCKET POOL // LOW LATENCY',
    overview: 'Full-featured social network built with Vue.js frontend and Go backend. Includes WebSocket real-time chat, private messaging, groups, follow system, notifications, and Dockerized deployment.',
    network: {
      frontend: 'Vue.js 3 SPA with reactive state management',
      backend: 'Go (Golang) concurrent HTTP & WebSocket server',
      database: 'SQLite with WAL (Write-Ahead Logging) mode',
      auth: 'HTTP-only Session Cookies & bcrypt hashing'
    },
    layers: [
      {
        name: 'Vue.js 3 Client Layer',
        icon: '🎨',
        details: 'Dynamic single-page application with real-time UI updates, optimistic messaging, notification sound triggers, and responsive layouts.'
      },
      {
        name: 'Go WebSocket Hub & Channels',
        icon: '⚡',
        details: 'Goroutine-per-connection WebSocket hub managing client registration, broadcast channels, private peer-to-peer room routing, and presence heartbeats.'
      },
      {
        name: 'Concurrent REST API Handlers',
        icon: '⚙️',
        details: 'Idiomatic Go standard library handlers for posts, profiles, group memberships, and media upload handling with zero bloated frameworks.'
      },
      {
        name: 'Persistent Data Layer',
        icon: '🗄️',
        details: 'SQLite with Write-Ahead Logging (WAL) and connection pooling, enabling high read concurrency and ACID-compliant transactional consistency.'
      }
    ],
    topologyNodes: [
      { id: 'browser', label: 'Vue.js Client', type: 'external', icon: '💻', x: '12%', y: '50%' },
      { id: 'ws', label: 'WebSocket Channel', type: 'network', icon: '⚡', x: '35%', y: '30%' },
      { id: 'rest', label: 'REST Handlers', type: 'network', icon: '🔗', x: '35%', y: '70%' },
      { id: 'hub', label: 'Go Broadcast Hub', type: 'compute', icon: '🐹', x: '62%', y: '50%' },
      { id: 'db', label: 'SQLite (WAL Mode)', type: 'telemetry', icon: '🗄️', x: '88%', y: '50%' }
    ],
    decisions: [
      {
        decision: 'Go Goroutines for WebSocket Concurrency',
        rationale: 'Go lightweight goroutines consume just 2KB stack memory per connection, easily scaling to thousands of concurrent chat users with minimal memory footprint.'
      },
      {
        decision: 'Write-Ahead Logging (WAL) in SQLite',
        rationale: 'Allows readers and writers to operate concurrently without database locking, dramatically improving chat throughput.'
      },
      {
        decision: 'Containerized Multi-Stage Deployment',
        rationale: 'Produces a statically compiled Go binary running inside a scratch Docker container weighing under 15MB.'
      }
    ],
    codeSnippetTitle: 'backend/pkg/websocket/hub.go — Go Channel Hub',
    codeSnippet: `type Hub struct {
    Clients    map[*Client]bool
    Broadcast  chan []byte
    Register   chan *Client
    Unregister chan *Client
}

func (h *Hub) Run() {
    for {
        select {
        case client := <-h.Register:
            h.Clients[client] = true
        case message := <-h.Broadcast:
            for client := range h.Clients {
                client.Send <- message
            }
        }
    }
}`
  },

  '01Blog': {
    title: 'Enterprise Role-Based Blogging Platform Architecture',
    subtitle: 'Spring Boot Backend, JPA/Hibernate & Angular Material',
    badge: 'Enterprise Spring Boot',
    status: 'RBAC SECURED // POSTGRESQL',
    overview: 'Full-featured enterprise blogging platform engineered with Spring Boot backend and Angular Material frontend. Features JWT authentication, granular Role-Based Access Control (RBAC), PostgreSQL persistence via JPA, and rich interactive engagement.',
    network: {
      frontend: 'Angular with RxJS reactive state and Material Design',
      backend: 'Java 17 & Spring Boot (Spring Security, Spring Data JPA)',
      database: 'PostgreSQL relational database with Flyway migrations',
      security: 'Stateless JWT Token Authentication & BCrypt'
    },
    layers: [
      {
        name: 'Angular Client & State',
        icon: '🅰️',
        details: 'Modular Angular components with RxJS observables, HTTP interceptors for automatic JWT attachment, and Angular Material UI.'
      },
      {
        name: 'Spring Security & JWT Filter',
        icon: '🛡️',
        details: 'Custom OncePerRequestFilter intercepts every HTTP request, validating RSA/HMAC-signed JWT tokens and populating the Spring SecurityContext.'
      },
      {
        name: 'Spring Data JPA & Service Layer',
        icon: '⚙️',
        details: 'Domain-driven architecture with transaction management (`@Transactional`), optimized repository queries, and DTO mapping.'
      },
      {
        name: 'PostgreSQL Relational DB',
        icon: '🐘',
        details: 'Robust relational schema modeling users, roles, posts, comments, categories, and likes with foreign key constraints and index tuning.'
      }
    ],
    topologyNodes: [
      { id: 'client', label: 'Angular SPA', type: 'external', icon: '🅰️', x: '12%', y: '50%' },
      { id: 'jwt', label: 'JWT Auth Filter', type: 'network', icon: '🛡️', x: '35%', y: '50%' },
      { id: 'spring', label: 'Spring Boot REST', type: 'ingress', icon: '🍃', x: '58%', y: '50%' },
      { id: 'jpa', label: 'Hibernate / JPA', type: 'compute', icon: '⚙️', x: '78%', y: '50%' },
      { id: 'pg', label: 'PostgreSQL DB', type: 'telemetry', icon: '🐘', x: '94%', y: '50%' }
    ],
    decisions: [
      {
        decision: 'Stateless JWT Authentication',
        rationale: 'Removes server-side session state, making the backend horizontally scalable behind load balancers with zero session sticky requirements.'
      },
      {
        decision: 'Repository Pattern with JPA Projections',
        rationale: 'Avoids N+1 query problems by using explicit JOIN FETCH queries and lightweight DTO projections for comment counts and user lists.'
      },
      {
        decision: 'Granular Role-Based Access Control (RBAC)',
        rationale: "Pre-authorize annotations (@PreAuthorize('hasRole(ADMIN)')) enforce security at the controller and service layer."
      }
    ],
    codeSnippetTitle: 'SecurityConfig.java — Spring Security JWT Filter Chain',
    codeSnippet: `@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session -> 
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
        rationale: "Pre-authorize annotations (@PreAuthorize('hasRole(ADMIN)')) enforce security at the controller and service layer."
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
}`
  }
}
