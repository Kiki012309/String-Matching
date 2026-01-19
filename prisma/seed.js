const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Function to generate PDF URLs (contoh: dari Google Scholar, ResearchGate, atau sumber lain)
function generatePdfUrl(index) {
  const pdfUrls = [
    "https://arxiv.org/pdf/2404.01234.pdf",
    "https://scholar.google.com/scholar?q=string+matching",
    "https://researchgate.net/publication/123456",
    "https://doi.org/10.1145/sample",
    "https://ieeexplore.ieee.org/document/9876543",
    "https://dl.acm.org/doi/pdf/10.1145/sample",
    "https://springer.com/article/sample",
    "https://sciencedirect.com/science/article/pii/sample",
  ]
  return pdfUrls[index % pdfUrls.length]
}

const journalData = [
  // Teknologi & Computer Science (35+ entries dengan topik spesifik)
  {
    title: "Advanced String Matching Algorithms for Pattern Recognition",
    authors: "Ahmad Rizki, Sarah Johnson, David Chen",
    publication_date: new Date("2024-03-15"),
    abstract: "This study presents a comprehensive analysis of string matching algorithms including Knuth-Morris-Pratt, Boyer-Moore, and Rabin-Karp. We compare their performance in various text processing scenarios and propose optimizations for large-scale pattern recognition tasks.",
    keywords: "string matching, pattern recognition, KMP algorithm, Boyer-Moore, text processing"
  },
  {
    title: "Levenshtein Distance and Fuzzy String Matching in Information Retrieval",
    authors: "Maria Garcia, John Smith, Li Wei",
    publication_date: new Date("2024-01-20"),
    abstract: "An in-depth exploration of edit distance algorithms and their applications in fuzzy search systems. The paper discusses Levenshtein, Damerau-Levenshtein, and Jaro-Winkler distance metrics for approximate string matching.",
    keywords: "Levenshtein distance, fuzzy matching, edit distance, approximate matching, similarity"
  },
  {
    title: "Backtracking Algorithms in Constraint Satisfaction Problems",
    authors: "Robert Anderson, Siti Nurhaliza, Kumar Patel",
    publication_date: new Date("2023-11-08"),
    abstract: "Investigation of backtracking techniques for solving NP-complete problems including N-Queens, Sudoku, and graph coloring. We present optimization strategies using forward checking and constraint propagation.",
    keywords: "backtracking, constraint satisfaction, CSP, N-Queens, algorithm optimization"
  },
  {
    title: "Brute Force vs Heuristic Approaches in Combinatorial Optimization",
    authors: "Jennifer Lee, Mohammed Al-Farsi, Yuki Tanaka",
    publication_date: new Date("2024-02-28"),
    abstract: "Comparative analysis of brute force exhaustive search methods versus heuristic algorithms in solving traveling salesman problem, knapsack problem, and job scheduling tasks.",
    keywords: "brute force, heuristic algorithms, combinatorial optimization, TSP, knapsack"
  },
  {
    title: "DevOps Practices and Continuous Integration/Continuous Deployment Pipelines",
    authors: "Thomas Brown, Fatima Hassan, Carlos Rodriguez",
    publication_date: new Date("2023-12-10"),
    abstract: "Best practices for implementing CI/CD pipelines using Jenkins, GitLab CI, and GitHub Actions. Analysis of containerization with Docker and orchestration with Kubernetes in modern DevOps workflows.",
    keywords: "DevOps, CI/CD, continuous integration, Jenkins, Docker, Kubernetes"
  },
  {
    title: "Fuzzy Logic Systems in Decision Making and Control Applications",
    authors: "Linda Wang, Ahmed Abdullah, Sophie Dubois",
    publication_date: new Date("2024-04-05"),
    abstract: "Implementation of fuzzy logic controllers for uncertain and imprecise systems. Case studies include temperature control, traffic light management, and credit risk assessment using fuzzy inference systems.",
    keywords: "fuzzy logic, fuzzy sets, fuzzy inference, decision making, control systems"
  },
  {
    title: "Apriori Algorithm for Association Rule Mining in Big Data",
    authors: "Richard Taylor, Priya Sharma, Hans Mueller",
    publication_date: new Date("2024-05-12"),
    abstract: "Application of Apriori algorithm for market basket analysis and frequent itemset mining. We propose optimizations for handling large-scale transactional databases and improving computational efficiency.",
    keywords: "Apriori algorithm, association rules, data mining, frequent itemsets, market basket"
  },
  {
    title: "Machine Learning Applications in Healthcare Diagnosis Systems",
    authors: "Budi Santoso, Dewi Lestari, Alex Turner",
    publication_date: new Date("2024-03-22"),
    abstract: "This study explores the implementation of machine learning algorithms in medical diagnosis systems, focusing on early detection of diseases using neural networks and decision trees.",
    keywords: "machine learning, healthcare, diagnosis, neural networks, AI"
  },
  {
    title: "Deep Learning Approaches for Natural Language Processing",
    authors: "Emma Rodriguez, Park Jin-Woo, Olivia Schmidt",
    publication_date: new Date("2024-01-20"),
    abstract: "A comprehensive review of transformer models and their applications in natural language understanding, sentiment analysis, and machine translation tasks.",
    keywords: "deep learning, NLP, transformers, BERT, language models"
  },
  {
    title: "Greedy Algorithms and Dynamic Programming for Resource Optimization",
    authors: "Hassan Al-Rashid, Marina Volkova, Diego Fernandez",
    publication_date: new Date("2023-11-08"),
    abstract: "Comparative study of greedy algorithms versus dynamic programming approaches in resource allocation, job scheduling, and optimization problems with practical implementations.",
    keywords: "greedy algorithms, dynamic programming, optimization, resource allocation"
  },
  {
    title: "Regular Expression Pattern Matching in Text Mining Applications",
    authors: "Jennifer Lee, Mohammed Al-Farsi, Yuki Tanaka",
    publication_date: new Date("2024-02-28"),
    abstract: "Advanced techniques for pattern matching using regular expressions in log analysis, data validation, and information extraction from unstructured text data.",
    keywords: "regex, pattern matching, text mining, information extraction"
  },
  {
    title: "Graph Algorithms: Depth-First Search and Breadth-First Search Applications",
    authors: "Thomas Brown, Fatima Hassan, Carlos Rodriguez",
    publication_date: new Date("2023-12-10"),
    abstract: "Implementation and analysis of DFS and BFS algorithms in network analysis, maze solving, social network graphs, and shortest path finding applications.",
    keywords: "graph algorithms, DFS, BFS, network analysis, shortest path"
  },
  {
    title: "Infrastructure as Code: Terraform and Ansible in Cloud Automation",
    authors: "Linda Wang, Ahmed Abdullah, Sophie Dubois",
    publication_date: new Date("2024-04-05"),
    abstract: "Best practices for implementing Infrastructure as Code using Terraform and Ansible for automated cloud resource provisioning, configuration management, and deployment orchestration.",
    keywords: "IaC, Terraform, Ansible, cloud automation, DevOps, infrastructure"
  },
  {
    title: "Genetic Algorithms and Evolutionary Computation for Problem Solving",
    authors: "Richard Taylor, Priya Sharma, Hans Mueller",
    publication_date: new Date("2023-10-22"),
    abstract: "Application of genetic algorithms in optimization problems including function optimization, feature selection, and neural network training using evolutionary strategies.",
    keywords: "genetic algorithms, evolutionary computation, optimization, metaheuristics"
  },
  {
    title: "Microservices Architecture and API Gateway Design Patterns",
    authors: "Elizabeth Martin, Omar Khalil, Anna Kowalski",
    publication_date: new Date("2024-01-12"),
    abstract: "Design patterns and best practices for building scalable microservices architectures with API gateways, service mesh, and distributed tracing systems.",
    keywords: "microservices, API gateway, distributed systems, architecture patterns"
  },
  {
    title: "Containerization and Orchestration: Docker Swarm vs Kubernetes",
    authors: "Michael Chang, Layla Ibrahim, Pierre Laurent",
    publication_date: new Date("2023-09-18"),
    abstract: "Comprehensive comparison of container orchestration platforms focusing on Docker Swarm and Kubernetes for managing containerized applications at scale.",
    keywords: "Docker, Kubernetes, containerization, orchestration, DevOps"
  },
  {
    title: "Naive Bayes Classification and Probabilistic Machine Learning",
    authors: "Catherine Nguyen, Raj Malhotra, Isabella Costa",
    publication_date: new Date("2024-03-30"),
    abstract: "Investigation of edge computing architectures for reducing latency in real-time applications.",
    keywords: "edge computing, real-time processing, latency, IoT"
  },
  {
    title: "Augmented Reality Applications in Education",
    authors: "Daniel Kim, Amina Yusuf, Lucas Silva",
    publication_date: new Date("2023-11-25"),
    abstract: "Development and evaluation of AR-based learning tools for enhanced student engagement and comprehension.",
    keywords: "augmented reality, education, learning, AR applications"
  },
  {
    title: "Natural Language Generation Using GPT Models",
    authors: "Rachel Green, Hassan Mahmoud, Emma Wilson",
    publication_date: new Date("2024-02-14"),
    abstract: "Comparative study of GPT-based language generation models and their applications in content creation.",
    keywords: "NLG, GPT, language models, text generation"
  },
  {
    title: "Reinforcement Learning in Robotics Control Systems",
    authors: "Kevin O'Brien, Zara Ahmed, Marco Rossi",
    publication_date: new Date("2023-12-28"),
    abstract: "Application of reinforcement learning algorithms for improving robot manipulation and navigation tasks.",
    keywords: "reinforcement learning, robotics, control systems, automation"
  },
  {
    title: "Data Privacy Protection in Social Media Platforms",
    authors: "Jessica Taylor, Abdullah Rahman, Sophia Anderson",
    publication_date: new Date("2024-01-08"),
    abstract: "Analysis of privacy concerns in social networks and proposed mechanisms for user data protection.",
    keywords: "data privacy, social media, protection, GDPR"
  },
  {
    title: "Federated Learning for Distributed Machine Learning",
    authors: "Christopher Davis, Noor Ali, Olivia Martinez",
    publication_date: new Date("2023-10-30"),
    abstract: "Investigation of federated learning approaches for training models across distributed datasets while preserving privacy.",
    keywords: "federated learning, distributed ML, privacy, decentralization"
  },
  {
    title: "Virtual Reality Training Simulations for Medical Professionals",
    authors: "Andrew Wilson, Leila Karim, Henrik Larsen",
    publication_date: new Date("2024-03-22"),
    abstract: "Development of VR-based training platforms for surgical procedures and medical emergency response.",
    keywords: "virtual reality, medical training, simulation, healthcare"
  },
  {
    title: "Adversarial Attacks on Neural Network Models",
    authors: "Samantha Jones, Ibrahim Hassan, Julia Schneider",
    publication_date: new Date("2023-11-15"),
    abstract: "Study of adversarial attack techniques and defense mechanisms for deep learning models.",
    keywords: "adversarial attacks, neural networks, security, defense"
  },
  {
    title: "Recommender Systems Using Collaborative Filtering",
    authors: "Brian Thompson, Aisha Mohammed, Viktor Petrov",
    publication_date: new Date("2024-02-05"),
    abstract: "Implementation and evaluation of collaborative filtering algorithms for personalized recommendation systems.",
    keywords: "recommender systems, collaborative filtering, personalization"
  },
  {
    title: "Smart City Infrastructure with IoT Integration",
    authors: "Laura Bennett, Tariq Aziz, Marina Popov",
    publication_date: new Date("2023-12-20"),
    abstract: "Framework for developing smart city solutions using IoT sensors and data analytics.",
    keywords: "smart cities, IoT, infrastructure, urban planning"
  },
  {
    title: "Transfer Learning in Image Classification Tasks",
    authors: "Nathan Clark, Yasmin Ali, Diego Fernandez",
    publication_date: new Date("2024-04-10"),
    abstract: "Evaluation of transfer learning techniques for improving image classification accuracy with limited training data.",
    keywords: "transfer learning, image classification, deep learning, CNN"
  },
  {
    title: "Explainable AI for Medical Decision Support",
    authors: "Rebecca Hall, Khalid Ibrahim, Ingrid Hansen",
    publication_date: new Date("2023-09-28"),
    abstract: "Development of interpretable machine learning models for clinical decision support systems.",
    keywords: "explainable AI, medical decisions, interpretability, XAI"
  },
  {
    title: "Graph Neural Networks for Social Network Analysis",
    authors: "Timothy Moore, Fatima Nour, Alessandro Bianchi",
    publication_date: new Date("2024-01-25"),
    abstract: "Application of graph neural networks for analyzing social network structures and community detection.",
    keywords: "graph neural networks, social networks, community detection"
  },
  {
    title: "Sentiment Analysis Using BERT Transformers",
    authors: "Amanda White, Youssef Mansour, Helena Costa",
    publication_date: new Date("2023-11-02"),
    abstract: "Implementation of BERT-based models for fine-grained sentiment analysis in social media texts.",
    keywords: "sentiment analysis, BERT, transformers, NLP"
  },
  {
    title: "Distributed Database Systems for High Availability",
    authors: "Gregory Lewis, Maryam Sadiq, Nikolai Ivanov",
    publication_date: new Date("2024-03-08"),
    abstract: "Design patterns and architectures for building fault-tolerant distributed database systems.",
    keywords: "distributed databases, high availability, fault tolerance"
  },
  {
    title: "Biometric Authentication Systems Using Deep Learning",
    authors: "Victoria Parker, Rashid Khan, Gabriela Santos",
    publication_date: new Date("2023-10-15"),
    abstract: "Development of deep learning-based biometric authentication systems for enhanced security.",
    keywords: "biometric authentication, deep learning, security, face recognition"
  },

  // Kesehatan & Kedokteran (25 entries)
  {
    title: "COVID-19 Vaccine Efficacy and Long-term Effects Study",
    authors: "Dr. Susan Miller, Dr. Ahmed Rashid, Dr. Elena Popova",
    publication_date: new Date("2024-01-30"),
    abstract: "Longitudinal study examining vaccine effectiveness and potential long-term health impacts across diverse populations.",
    keywords: "COVID-19, vaccine, efficacy, public health, immunology"
  },
  {
    title: "Telemedicine Adoption in Rural Healthcare Systems",
    authors: "Dr. James Robinson, Dr. Siti Rahayu, Dr. Carlos Mendoza",
    publication_date: new Date("2023-12-05"),
    abstract: "Analysis of telemedicine implementation challenges and benefits in underserved rural communities.",
    keywords: "telemedicine, rural healthcare, digital health, accessibility"
  },
  {
    title: "Cancer Immunotherapy: Recent Advances and Clinical Trials",
    authors: "Dr. Maria Santos, Dr. Hassan Ali, Dr. Sophie Laurent",
    publication_date: new Date("2024-02-18"),
    abstract: "Comprehensive review of immunotherapy approaches in cancer treatment and ongoing clinical research.",
    keywords: "cancer, immunotherapy, clinical trials, oncology"
  },
  {
    title: "Mental Health Interventions for Adolescents",
    authors: "Dr. Patricia Adams, Dr. Omar Farid, Dr. Anna Kowalska",
    publication_date: new Date("2023-11-20"),
    abstract: "Evaluation of therapeutic interventions for anxiety and depression in teenage populations.",
    keywords: "mental health, adolescents, interventions, psychology"
  },
  {
    title: "Diabetes Management with Continuous Glucose Monitoring",
    authors: "Dr. Robert Chen, Dr. Aisha Hassan, Dr. Marco Rossi",
    publication_date: new Date("2024-03-12"),
    abstract: "Study on the effectiveness of CGM devices in improving glycemic control for diabetic patients.",
    keywords: "diabetes, glucose monitoring, medical devices, endocrinology"
  },
  {
    title: "Artificial Intelligence in Radiology Image Analysis",
    authors: "Dr. Linda Park, Dr. Ibrahim Khalil, Dr. Emma Wilson",
    publication_date: new Date("2023-10-08"),
    abstract: "Implementation of AI algorithms for automated detection of abnormalities in radiological images.",
    keywords: "AI, radiology, medical imaging, diagnostics"
  },
  {
    title: "Cardiovascular Disease Prevention Through Lifestyle Modification",
    authors: "Dr. William Turner, Dr. Fatima Nour, Dr. Henrik Nielsen",
    publication_date: new Date("2024-01-15"),
    abstract: "Investigation of diet and exercise interventions for reducing cardiovascular disease risk.",
    keywords: "cardiovascular disease, prevention, lifestyle, nutrition"
  },
  {
    title: "Antibiotic Resistance Patterns in Hospital-Acquired Infections",
    authors: "Dr. Karen Mitchell, Dr. Tariq Abdullah, Dr. Julia Schneider",
    publication_date: new Date("2023-12-22"),
    abstract: "Analysis of antibiotic resistance trends and implications for infection control protocols.",
    keywords: "antibiotic resistance, hospital infections, microbiology"
  },
  {
    title: "Neurodegenerative Diseases: Alzheimer's Early Detection Methods",
    authors: "Dr. Steven Harris, Dr. Leila Karimi, Dr. Alessandro Bianchi",
    publication_date: new Date("2024-02-28"),
    abstract: "Development of biomarkers and imaging techniques for early diagnosis of Alzheimer's disease.",
    keywords: "neurodegenerative, Alzheimer's, early detection, biomarkers"
  },
  {
    title: "Prenatal Care and Maternal Health Outcomes",
    authors: "Dr. Michelle Brown, Dr. Youssef Mansour, Dr. Ingrid Hansen",
    publication_date: new Date("2023-11-10"),
    abstract: "Study examining the relationship between prenatal care quality and maternal-infant health outcomes.",
    keywords: "prenatal care, maternal health, obstetrics, pregnancy"
  },
  {
    title: "Gene Therapy Approaches for Rare Genetic Disorders",
    authors: "Dr. Daniel Lee, Dr. Amina Yusuf, Dr. Viktor Petrov",
    publication_date: new Date("2024-03-25"),
    abstract: "Exploration of gene editing techniques for treating rare genetic conditions.",
    keywords: "gene therapy, genetic disorders, CRISPR, genetics"
  },
  {
    title: "Sleep Disorders and Their Impact on Cognitive Function",
    authors: "Dr. Rachel Green, Dr. Khalid Ibrahim, Dr. Marina Popov",
    publication_date: new Date("2023-10-25"),
    abstract: "Investigation of how sleep disturbances affect memory, attention, and executive function.",
    keywords: "sleep disorders, cognitive function, neuroscience, insomnia"
  },
  {
    title: "Regenerative Medicine Using Stem Cell Therapy",
    authors: "Dr. Christopher Davis, Dr. Zara Ahmed, Dr. Lucas Silva",
    publication_date: new Date("2024-01-18"),
    abstract: "Clinical applications of stem cell therapy for tissue regeneration and repair.",
    keywords: "regenerative medicine, stem cells, tissue engineering"
  },
  {
    title: "Pediatric Vaccination Programs: Coverage and Compliance",
    authors: "Dr. Jennifer Martin, Dr. Abdullah Rahman, Dr. Helena Costa",
    publication_date: new Date("2023-12-15"),
    abstract: "Assessment of vaccination program effectiveness and factors influencing parental compliance.",
    keywords: "pediatrics, vaccination, immunization, public health"
  },
  {
    title: "Chronic Pain Management: Opioid Alternatives",
    authors: "Dr. Thomas Anderson, Dr. Noor Ali, Dr. Sophia Martinez",
    publication_date: new Date("2024-02-08"),
    abstract: "Evaluation of non-opioid pain management strategies for chronic pain patients.",
    keywords: "chronic pain, pain management, alternatives, opioids"
  },
  {
    title: "Obesity and Metabolic Syndrome: Intervention Strategies",
    authors: "Dr. Barbara Wilson, Dr. Hassan Mahmoud, Dr. Gabriela Santos",
    publication_date: new Date("2023-11-28"),
    abstract: "Multi-faceted approach to treating obesity and associated metabolic complications.",
    keywords: "obesity, metabolic syndrome, intervention, nutrition"
  },
  {
    title: "Infectious Disease Outbreak Prediction Models",
    authors: "Dr. Kevin O'Brien, Dr. Yasmin Ali, Dr. Diego Fernandez",
    publication_date: new Date("2024-03-18"),
    abstract: "Development of predictive models for anticipating infectious disease outbreaks.",
    keywords: "infectious disease, prediction models, epidemiology"
  },
  {
    title: "Transplant Immunology: Rejection Prevention Strategies",
    authors: "Dr. Laura Bennett, Dr. Rashid Khan, Dr. Nikolai Ivanov",
    publication_date: new Date("2023-10-12"),
    abstract: "Research on immunosuppressive protocols to reduce organ transplant rejection rates.",
    keywords: "transplant, immunology, rejection, organ transplantation"
  },
  {
    title: "Respiratory Diseases: COPD Management Guidelines",
    authors: "Dr. Nathan Clark, Dr. Maryam Sadiq, Dr. Emma Johnson",
    publication_date: new Date("2024-01-22"),
    abstract: "Updated clinical guidelines for managing chronic obstructive pulmonary disease.",
    keywords: "respiratory disease, COPD, management, pulmonology"
  },
  {
    title: "Nutritional Deficiencies in Developing Countries",
    authors: "Dr. Rebecca Hall, Dr. Ibrahim Hassan, Dr. Anna Schmidt",
    publication_date: new Date("2023-12-08"),
    abstract: "Study of micronutrient deficiencies and their health impacts in low-income populations.",
    keywords: "nutrition, deficiencies, public health, global health"
  },
  {
    title: "Autoimmune Diseases: Pathogenesis and Treatment",
    authors: "Dr. Timothy Moore, Dr. Fatima Nour, Dr. Pierre Laurent",
    publication_date: new Date("2024-02-25"),
    abstract: "Investigation of autoimmune disease mechanisms and emerging therapeutic approaches.",
    keywords: "autoimmune diseases, pathogenesis, treatment, immunology"
  },
  {
    title: "Palliative Care Quality Improvement Initiatives",
    authors: "Dr. Amanda White, Dr. Omar Khalil, Dr. Olivia Anderson",
    publication_date: new Date("2023-11-18"),
    abstract: "Evaluation of programs aimed at enhancing end-of-life care quality.",
    keywords: "palliative care, quality improvement, end-of-life care"
  },
  {
    title: "Skin Cancer Detection Using Dermoscopy",
    authors: "Dr. Gregory Lewis, Dr. Leila Karim, Dr. Marco Colombo",
    publication_date: new Date("2024-03-05"),
    abstract: "Application of dermoscopic imaging for early melanoma detection.",
    keywords: "skin cancer, dermoscopy, melanoma, dermatology"
  },
  {
    title: "Hypertension Control in Primary Care Settings",
    authors: "Dr. Victoria Parker, Dr. Ahmed Abdullah, Dr. Sophie Dubois",
    publication_date: new Date("2023-10-28"),
    abstract: "Strategies for improving blood pressure management in primary healthcare.",
    keywords: "hypertension, primary care, blood pressure, cardiology"
  },
  {
    title: "Reproductive Health Services Access in Urban Areas",
    authors: "Dr. Andrew Wilson, Dr. Aisha Mohammed, Dr. Helena Santos",
    publication_date: new Date("2024-01-28"),
    abstract: "Analysis of reproductive healthcare accessibility and utilization in metropolitan regions.",
    keywords: "reproductive health, access, urban health, family planning"
  },

  // Pendidikan (20 entries)
  {
    title: "Digital Learning Platforms Impact on Student Performance",
    authors: "Prof. Sarah Johnson, Dr. Ahmad Rizki, Dr. Li Wei",
    publication_date: new Date("2024-02-10"),
    abstract: "Comparative study of traditional vs. digital learning outcomes across different age groups.",
    keywords: "digital learning, education technology, student performance"
  },
  {
    title: "Gamification Strategies in Elementary Education",
    authors: "Dr. Maria Garcia, Prof. John Smith, Dr. Kumar Patel",
    publication_date: new Date("2023-11-12"),
    abstract: "Investigation of game-based learning methods for improving engagement in primary schools.",
    keywords: "gamification, elementary education, engagement, learning"
  },
  {
    title: "Teacher Professional Development Programs Effectiveness",
    authors: "Prof. Robert Anderson, Dr. Siti Nurhaliza, Dr. David Chen",
    publication_date: new Date("2024-03-15"),
    abstract: "Evaluation of continuous professional development impact on teaching quality.",
    keywords: "teacher development, professional training, education quality"
  },
  {
    title: "Online Assessment Methods in Higher Education",
    authors: "Dr. Jennifer Lee, Prof. Mohammed Al-Farsi, Dr. Yuki Tanaka",
    publication_date: new Date("2023-12-20"),
    abstract: "Analysis of online examination integrity and effectiveness in university settings.",
    keywords: "online assessment, higher education, examination, e-learning"
  },
  {
    title: "Special Education Inclusion Practices",
    authors: "Prof. Thomas Brown, Dr. Fatima Hassan, Dr. Carlos Rodriguez",
    publication_date: new Date("2024-01-25"),
    abstract: "Best practices for integrating students with special needs into mainstream classrooms.",
    keywords: "special education, inclusion, accessibility, pedagogy"
  },
  {
    title: "STEM Education Gender Gap Analysis",
    authors: "Dr. Linda Wang, Prof. Ahmed Abdullah, Dr. Sophie Dubois",
    publication_date: new Date("2023-10-18"),
    abstract: "Study of factors contributing to gender disparities in science and technology education.",
    keywords: "STEM education, gender gap, diversity, science education"
  },
  {
    title: "Flipped Classroom Model Implementation",
    authors: "Prof. Richard Taylor, Dr. Priya Sharma, Dr. Hans Mueller",
    publication_date: new Date("2024-02-22"),
    abstract: "Effectiveness of flipped classroom approach in secondary education settings.",
    keywords: "flipped classroom, teaching methods, active learning"
  },
  {
    title: "Multilingual Education in Diverse Classrooms",
    authors: "Dr. Elizabeth Martin, Prof. Omar Khalil, Dr. Anna Kowalski",
    publication_date: new Date("2023-11-30"),
    abstract: "Strategies for supporting multilingual learners in multicultural educational environments.",
    keywords: "multilingual education, diversity, language learning"
  },
  {
    title: "Critical Thinking Skills Development in Curriculum",
    authors: "Prof. Michael Chang, Dr. Layla Ibrahim, Dr. Pierre Laurent",
    publication_date: new Date("2024-03-28"),
    abstract: "Framework for integrating critical thinking exercises across subject areas.",
    keywords: "critical thinking, curriculum development, pedagogy"
  },
  {
    title: "Early Childhood Education Quality Indicators",
    authors: "Dr. Catherine Nguyen, Prof. Raj Malhotra, Dr. Isabella Costa",
    publication_date: new Date("2023-12-12"),
    abstract: "Identification of key quality markers in preschool education programs.",
    keywords: "early childhood education, quality indicators, preschool"
  },
  {
    title: "Project-Based Learning in Science Education",
    authors: "Prof. Daniel Kim, Dr. Amina Yusuf, Dr. Lucas Silva",
    publication_date: new Date("2024-01-15"),
    abstract: "Implementation and outcomes of project-based science curricula in middle schools.",
    keywords: "project-based learning, science education, hands-on learning"
  },
  {
    title: "Student Motivation Factors in Higher Education",
    authors: "Dr. Rachel Green, Prof. Hassan Mahmoud, Dr. Emma Wilson",
    publication_date: new Date("2023-10-25"),
    abstract: "Analysis of intrinsic and extrinsic motivation factors affecting university students.",
    keywords: "student motivation, higher education, learning psychology"
  },
  {
    title: "Blended Learning Models Post-Pandemic",
    authors: "Prof. Kevin O'Brien, Dr. Zara Ahmed, Dr. Marco Rossi",
    publication_date: new Date("2024-02-18"),
    abstract: "Evolution of hybrid teaching approaches following COVID-19 pandemic.",
    keywords: "blended learning, pandemic education, hybrid learning"
  },
  {
    title: "Peer Assessment in Collaborative Learning",
    authors: "Dr. Jessica Taylor, Prof. Abdullah Rahman, Dr. Sophia Anderson",
    publication_date: new Date("2023-11-22"),
    abstract: "Effectiveness of peer evaluation methods in group learning activities.",
    keywords: "peer assessment, collaborative learning, evaluation methods"
  },
  {
    title: "Educational Leadership in School Improvement",
    authors: "Prof. Christopher Davis, Dr. Noor Ali, Dr. Olivia Martinez",
    publication_date: new Date("2024-03-10"),
    abstract: "Role of school leadership in driving institutional change and improvement.",
    keywords: "educational leadership, school improvement, administration"
  },
  {
    title: "Learning Analytics for Personalized Education",
    authors: "Dr. Andrew Wilson, Prof. Leila Karim, Dr. Henrik Larsen",
    publication_date: new Date("2023-12-28"),
    abstract: "Application of data analytics to create individualized learning pathways.",
    keywords: "learning analytics, personalized education, data-driven learning"
  },
  {
    title: "Social-Emotional Learning Integration",
    authors: "Prof. Samantha Jones, Dr. Ibrahim Hassan, Dr. Julia Schneider",
    publication_date: new Date("2024-01-20"),
    abstract: "Incorporating social and emotional skill development into academic curricula.",
    keywords: "social-emotional learning, SEL, student wellbeing"
  },
  {
    title: "Vocational Training Alignment with Industry Needs",
    authors: "Dr. Brian Thompson, Prof. Aisha Mohammed, Dr. Viktor Petrov",
    publication_date: new Date("2023-11-05"),
    abstract: "Gap analysis between vocational education programs and labor market demands.",
    keywords: "vocational training, industry alignment, workforce development"
  },
  {
    title: "Assessment Literacy Among Educators",
    authors: "Prof. Laura Bennett, Dr. Tariq Aziz, Dr. Marina Popov",
    publication_date: new Date("2024-02-28"),
    abstract: "Study of teachers' understanding and application of assessment principles.",
    keywords: "assessment literacy, teacher knowledge, evaluation"
  },
  {
    title: "Outdoor Education Benefits for Child Development",
    authors: "Dr. Nathan Clark, Prof. Yasmin Ali, Dr. Diego Fernandez",
    publication_date: new Date("2023-12-15"),
    abstract: "Impact of outdoor learning experiences on physical and cognitive development.",
    keywords: "outdoor education, child development, experiential learning"
  },

  // Lingkungan & Sustainability (15 entries)
  {
    title: "Climate Change Mitigation Through Renewable Energy",
    authors: "Dr. Rebecca Hall, Prof. Khalid Ibrahim, Dr. Ingrid Hansen",
    publication_date: new Date("2024-03-20"),
    abstract: "Analysis of renewable energy adoption impact on carbon emission reduction.",
    keywords: "climate change, renewable energy, sustainability, carbon emissions"
  },
  {
    title: "Plastic Pollution in Ocean Ecosystems",
    authors: "Prof. Timothy Moore, Dr. Fatima Nour, Dr. Alessandro Bianchi",
    publication_date: new Date("2023-11-08"),
    abstract: "Study of microplastic distribution and effects on marine biodiversity.",
    keywords: "plastic pollution, ocean, marine ecosystems, microplastics"
  },
  {
    title: "Urban Green Spaces and Air Quality Improvement",
    authors: "Dr. Amanda White, Prof. Youssef Mansour, Dr. Helena Costa",
    publication_date: new Date("2024-02-12"),
    abstract: "Impact of urban vegetation on reducing air pollution in metropolitan areas.",
    keywords: "urban green spaces, air quality, pollution, urban planning"
  },
  {
    title: "Sustainable Agriculture Practices for Food Security",
    authors: "Prof. Gregory Lewis, Dr. Maryam Sadiq, Dr. Nikolai Ivanov",
    publication_date: new Date("2023-12-18"),
    abstract: "Evaluation of sustainable farming methods for improving crop yields and soil health.",
    keywords: "sustainable agriculture, food security, organic farming"
  },
  {
    title: "Water Conservation Technologies in Arid Regions",
    authors: "Dr. Victoria Parker, Prof. Rashid Khan, Dr. Gabriela Santos",
    publication_date: new Date("2024-01-28"),
    abstract: "Innovative water management solutions for drought-prone areas.",
    keywords: "water conservation, arid regions, drought, water management"
  },
  {
    title: "Biodiversity Loss and Ecosystem Services",
    authors: "Prof. Steven Harris, Dr. Leila Karimi, Dr. Alessandro Bianchi",
    publication_date: new Date("2023-10-15"),
    abstract: "Impact of biodiversity decline on essential ecosystem functions and services.",
    keywords: "biodiversity, ecosystem services, conservation, ecology"
  },
  {
    title: "Circular Economy Models in Manufacturing",
    authors: "Dr. Michelle Brown, Prof. Youssef Mansour, Dr. Ingrid Hansen",
    publication_date: new Date("2024-03-05"),
    abstract: "Implementation of circular economy principles in industrial production systems.",
    keywords: "circular economy, manufacturing, sustainability, recycling"
  },
  {
    title: "Deforestation Effects on Global Carbon Cycle",
    authors: "Prof. Daniel Lee, Dr. Amina Yusuf, Dr. Viktor Petrov",
    publication_date: new Date("2023-11-25"),
    abstract: "Analysis of forest loss impact on atmospheric carbon dioxide levels.",
    keywords: "deforestation, carbon cycle, climate, forests"
  },
  {
    title: "Renewable Energy Grid Integration Challenges",
    authors: "Dr. Rachel Green, Prof. Khalid Ibrahim, Dr. Marina Popov",
    publication_date: new Date("2024-02-22"),
    abstract: "Technical and economic challenges in integrating solar and wind power into electrical grids.",
    keywords: "renewable energy, grid integration, solar power, wind energy"
  },
  {
    title: "Waste Management Systems in Developing Nations",
    authors: "Prof. Christopher Davis, Dr. Zara Ahmed, Dr. Lucas Silva",
    publication_date: new Date("2023-12-10"),
    abstract: "Strategies for improving solid waste collection and disposal in low-income countries.",
    keywords: "waste management, developing countries, sanitation"
  },
  {
    title: "Coral Reef Restoration Techniques",
    authors: "Dr. Jennifer Martin, Prof. Abdullah Rahman, Dr. Helena Costa",
    publication_date: new Date("2024-01-18"),
    abstract: "Innovative methods for rehabilitating damaged coral reef ecosystems.",
    keywords: "coral reefs, restoration, marine conservation, ecology"
  },
  {
    title: "Green Building Design and Energy Efficiency",
    authors: "Prof. Thomas Anderson, Dr. Noor Ali, Dr. Sophia Martinez",
    publication_date: new Date("2023-10-28"),
    abstract: "Sustainable architecture principles for reducing building energy consumption.",
    keywords: "green building, energy efficiency, sustainable design, architecture"
  },
  {
    title: "Electric Vehicle Adoption and Environmental Impact",
    authors: "Dr. Barbara Wilson, Prof. Hassan Mahmoud, Dr. Gabriela Santos",
    publication_date: new Date("2024-03-15"),
    abstract: "Life cycle analysis of electric vehicles versus traditional combustion engines.",
    keywords: "electric vehicles, environmental impact, transportation, sustainability"
  },
  {
    title: "Wildlife Conservation Through Community Engagement",
    authors: "Prof. Kevin O'Brien, Dr. Yasmin Ali, Dr. Diego Fernandez",
    publication_date: new Date("2023-11-18"),
    abstract: "Role of local communities in protecting endangered species and habitats.",
    keywords: "wildlife conservation, community engagement, endangered species"
  },
  {
    title: "Climate Adaptation Strategies for Coastal Cities",
    authors: "Dr. Laura Bennett, Prof. Tariq Aziz, Dr. Marina Popov",
    publication_date: new Date("2024-02-08"),
    abstract: "Urban planning approaches for managing sea level rise and extreme weather events.",
    keywords: "climate adaptation, coastal cities, sea level rise, urban planning"
  },

  // Ekonomi & Bisnis (15 entries)
  {
    title: "Digital Transformation in Small and Medium Enterprises",
    authors: "Prof. Nathan Clark, Dr. Yasmin Ali, Dr. Diego Fernandez",
    publication_date: new Date("2024-03-12"),
    abstract: "Study of digital technology adoption challenges and benefits for SMEs.",
    keywords: "digital transformation, SMEs, business technology, innovation"
  },
  {
    title: "Cryptocurrency Market Volatility Analysis",
    authors: "Dr. Rebecca Hall, Prof. Khalid Ibrahim, Dr. Ingrid Hansen",
    publication_date: new Date("2023-12-22"),
    abstract: "Investigation of factors driving price fluctuations in cryptocurrency markets.",
    keywords: "cryptocurrency, market volatility, Bitcoin, blockchain"
  },
  {
    title: "E-commerce Consumer Behavior Patterns",
    authors: "Prof. Timothy Moore, Dr. Fatima Nour, Dr. Alessandro Bianchi",
    publication_date: new Date("2024-01-30"),
    abstract: "Analysis of online shopping behaviors and purchase decision factors.",
    keywords: "e-commerce, consumer behavior, online shopping, marketing"
  },
  {
    title: "Financial Inclusion Through Mobile Banking",
    authors: "Dr. Amanda White, Prof. Youssef Mansour, Dr. Helena Costa",
    publication_date: new Date("2023-11-15"),
    abstract: "Impact of mobile banking services on financial access in underbanked populations.",
    keywords: "financial inclusion, mobile banking, fintech, digital finance"
  },
  {
    title: "Corporate Social Responsibility and Brand Loyalty",
    authors: "Prof. Gregory Lewis, Dr. Maryam Sadiq, Dr. Nikolai Ivanov",
    publication_date: new Date("2024-02-28"),
    abstract: "Relationship between CSR initiatives and customer loyalty in retail sector.",
    keywords: "CSR, brand loyalty, corporate responsibility, marketing"
  },
  {
    title: "Supply Chain Resilience During Global Disruptions",
    authors: "Dr. Victoria Parker, Prof. Rashid Khan, Dr. Gabriela Santos",
    publication_date: new Date("2023-10-20"),
    abstract: "Strategies for building robust supply chains resistant to global shocks.",
    keywords: "supply chain, resilience, risk management, logistics"
  },
  {
    title: "Remote Work Impact on Organizational Productivity",
    authors: "Prof. Steven Harris, Dr. Leila Karimi, Dr. Alessandro Bianchi",
    publication_date: new Date("2024-03-25"),
    abstract: "Evaluation of remote work policies on employee performance and company outcomes.",
    keywords: "remote work, productivity, organizational behavior, telecommuting"
  },
  {
    title: "Startup Ecosystem Development in Emerging Markets",
    authors: "Dr. Michelle Brown, Prof. Youssef Mansour, Dr. Ingrid Hansen",
    publication_date: new Date("2023-12-08"),
    abstract: "Analysis of factors fostering entrepreneurship in developing economies.",
    keywords: "startups, entrepreneurship, emerging markets, innovation"
  },
  {
    title: "Artificial Intelligence in Financial Services",
    authors: "Prof. Daniel Lee, Dr. Amina Yusuf, Dr. Viktor Petrov",
    publication_date: new Date("2024-01-12"),
    abstract: "Applications of AI in banking, insurance, and investment management.",
    keywords: "AI, financial services, fintech, automation"
  },
  {
    title: "Green Finance and Sustainable Investment",
    authors: "Dr. Rachel Green, Prof. Khalid Ibrahim, Dr. Marina Popov",
    publication_date: new Date("2023-11-28"),
    abstract: "Growth of ESG investing and green bonds in global financial markets.",
    keywords: "green finance, sustainable investment, ESG, impact investing"
  },
  {
    title: "Gig Economy Worker Rights and Protections",
    authors: "Prof. Christopher Davis, Dr. Zara Ahmed, Dr. Lucas Silva",
    publication_date: new Date("2024-02-15"),
    abstract: "Legal and economic analysis of labor protections for gig economy workers.",
    keywords: "gig economy, labor rights, employment, platform work"
  },
  {
    title: "Cross-Cultural Management in Multinational Corporations",
    authors: "Dr. Jennifer Martin, Prof. Abdullah Rahman, Dr. Helena Costa",
    publication_date: new Date("2023-10-30"),
    abstract: "Challenges and strategies for managing diverse workforces across cultures.",
    keywords: "cross-cultural management, multinational corporations, diversity"
  },
  {
    title: "Behavioral Economics in Consumer Decision Making",
    authors: "Prof. Thomas Anderson, Dr. Noor Ali, Dr. Sophia Martinez",
    publication_date: new Date("2024-03-18"),
    abstract: "Application of behavioral economics principles to understand purchasing behaviors.",
    keywords: "behavioral economics, consumer decisions, psychology, marketing"
  },
  {
    title: "Mergers and Acquisitions Success Factors",
    authors: "Dr. Barbara Wilson, Prof. Hassan Mahmoud, Dr. Gabriela Santos",
    publication_date: new Date("2023-12-28"),
    abstract: "Determinants of successful corporate mergers and acquisition integration.",
    keywords: "mergers and acquisitions, M&A, corporate strategy, integration"
  },
  {
    title: "Influencer Marketing Effectiveness Measurement",
    authors: "Prof. Kevin O'Brien, Dr. Yasmin Ali, Dr. Diego Fernandez",
    publication_date: new Date("2024-01-22"),
    abstract: "Metrics and methods for evaluating ROI of influencer marketing campaigns.",
    keywords: "influencer marketing, social media, ROI, digital marketing"
  }
]

async function main() {
  console.log('Starting database seeding...')
  
  try {
    // Clear existing data
    await prisma.journal.deleteMany()
    console.log('Cleared existing journal data')
    
    // Insert new data
    for (const journal of journalData) {
      await prisma.journal.create({
        data: journal
      })
    }
    
    console.log(`Successfully seeded ${journalData.length} journals`)
    
    // Verify data
    const count = await prisma.journal.count()
    console.log(`Total journals in database: ${count}`)
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
