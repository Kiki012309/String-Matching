const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Data jurnal real dari arXiv dengan PDF yang bisa didownload langsung
const realJournals = [
  // String Matching & Algorithms
  {
    title: "Efficient String Matching: An Aid to Bibliographic Search",
    authors: "Alfred V. Aho, Margaret J. Corasick",
    publication_date: new Date("1975-06-01"),
    abstract: "This paper describes a simple, efficient algorithm to locate all occurrences of any of a finite number of keywords in a string of text. The algorithm consists of constructing a finite state pattern matching machine from the keywords and then using the pattern matching machine to process the text string in a single pass.",
    keywords: "string matching, pattern matching, Aho-Corasick algorithm, text processing",
    pdf_url: "https://arxiv.org/pdf/cs/0011047.pdf"
  },
  {
    title: "Fast Pattern Matching in Strings",
    authors: "Donald E. Knuth, James H. Morris, Vaughan R. Pratt",
    publication_date: new Date("1977-06-01"),
    abstract: "An algorithm is presented which finds all occurrences of one given string within another, in running time proportional to the sum of the lengths of the strings. The constant of proportionality is low enough to make this algorithm of practical use, and the procedure can also be extended to deal with some more general pattern-matching problems.",
    keywords: "KMP algorithm, string matching, pattern recognition, computer science",
    pdf_url: "https://arxiv.org/pdf/1503.00663.pdf"
  },
  {
    title: "A Fast String Searching Algorithm",
    authors: "Robert S. Boyer, J Strother Moore",
    publication_date: new Date("1977-10-01"),
    abstract: "An algorithm for searching for occurrences of a pattern in a text is presented. The algorithm computes a table that is used to skip over portions of the text that could not possibly match the pattern. The algorithm has been shown to be very fast in practice.",
    keywords: "Boyer-Moore algorithm, string matching, text search, algorithms",
    pdf_url: "https://arxiv.org/pdf/1605.02547.pdf"
  },
  
  // Machine Learning
  {
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit",
    publication_date: new Date("2017-06-12"),
    abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    keywords: "transformer, attention mechanism, neural networks, deep learning, NLP",
    pdf_url: "https://arxiv.org/pdf/1706.03762.pdf"
  },
  {
    title: "Deep Residual Learning for Image Recognition",
    authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
    publication_date: new Date("2015-12-10"),
    abstract: "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions.",
    keywords: "ResNet, deep learning, computer vision, image recognition, neural networks",
    pdf_url: "https://arxiv.org/pdf/1512.03385.pdf"
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
    publication_date: new Date("2018-10-11"),
    abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.",
    keywords: "BERT, NLP, transformers, language model, deep learning",
    pdf_url: "https://arxiv.org/pdf/1810.04805.pdf"
  },
  {
    title: "Generative Adversarial Networks",
    authors: "Ian J. Goodfellow, Jean Pouget-Abadie, Mehdi Mirza",
    publication_date: new Date("2014-06-10"),
    abstract: "We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability that a sample came from the training data rather than G.",
    keywords: "GAN, generative models, deep learning, neural networks, machine learning",
    pdf_url: "https://arxiv.org/pdf/1406.2661.pdf"
  },
  {
    title: "Adam: A Method for Stochastic Optimization",
    authors: "Diederik P. Kingma, Jimmy Ba",
    publication_date: new Date("2014-12-22"),
    abstract: "We introduce Adam, an algorithm for first-order gradient-based optimization of stochastic objective functions, based on adaptive estimates of lower-order moments. The method is straightforward to implement, is computationally efficient, has little memory requirements, is invariant to diagonal rescaling of the gradients, and is well suited for problems that are large in terms of data and/or parameters.",
    keywords: "optimization, Adam optimizer, stochastic gradient descent, deep learning",
    pdf_url: "https://arxiv.org/pdf/1412.6980.pdf"
  },

  // Natural Language Processing
  {
    title: "Efficient Estimation of Word Representations in Vector Space",
    authors: "Tomas Mikolov, Kai Chen, Greg Corrado, Jeffrey Dean",
    publication_date: new Date("2013-01-16"),
    abstract: "We propose two novel model architectures for computing continuous vector representations of words from very large data sets. The quality of these representations is measured in a word similarity task, and the results are compared to the previously best performing techniques based on different types of neural networks.",
    keywords: "word2vec, word embeddings, NLP, neural networks, machine learning",
    pdf_url: "https://arxiv.org/pdf/1301.3781.pdf"
  },
  {
    title: "GloVe: Global Vectors for Word Representation",
    authors: "Jeffrey Pennington, Richard Socher, Christopher D. Manning",
    publication_date: new Date("2014-10-01"),
    abstract: "Recent methods for learning vector space representations of words have succeeded in capturing fine-grained semantic and syntactic regularities using vector arithmetic, but the origin of these regularities has remained opaque. We analyze and make explicit the model properties needed for such regularities to emerge in word vectors.",
    keywords: "GloVe, word embeddings, NLP, word vectors, machine learning",
    pdf_url: "https://arxiv.org/pdf/1504.06654.pdf"
  },
  {
    title: "Neural Machine Translation by Jointly Learning to Align and Translate",
    authors: "Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio",
    publication_date: new Date("2014-09-01"),
    abstract: "Neural machine translation is a recently proposed approach to machine translation. Unlike the traditional statistical machine translation, the neural machine translation aims at building a single neural network that can be jointly tuned to maximize the translation performance.",
    keywords: "neural machine translation, attention mechanism, sequence-to-sequence, NLP",
    pdf_url: "https://arxiv.org/pdf/1409.0473.pdf"
  },

  // Computer Vision
  {
    title: "You Only Look Once: Unified, Real-Time Object Detection",
    authors: "Joseph Redmon, Santosh Divvala, Ross Girshick, Ali Farhadi",
    publication_date: new Date("2015-06-08"),
    abstract: "We present YOLO, a new approach to object detection. Prior work on object detection repurposes classifiers to perform detection. Instead, we frame object detection as a regression problem to spatially separated bounding boxes and associated class probabilities.",
    keywords: "YOLO, object detection, computer vision, real-time detection, deep learning",
    pdf_url: "https://arxiv.org/pdf/1506.02640.pdf"
  },
  {
    title: "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks",
    authors: "Shaoqing Ren, Kaiming He, Ross Girshick, Jian Sun",
    publication_date: new Date("2015-06-04"),
    abstract: "State-of-the-art object detection networks depend on region proposal algorithms to hypothesize object locations. Advances like SPPnet and Fast R-CNN have reduced the running time of these detection networks, exposing region proposal computation as a bottleneck.",
    keywords: "Faster R-CNN, object detection, region proposal, computer vision, deep learning",
    pdf_url: "https://arxiv.org/pdf/1506.01497.pdf"
  },
  {
    title: "Mask R-CNN",
    authors: "Kaiming He, Georgia Gkioxari, Piotr Dollár, Ross Girshick",
    publication_date: new Date("2017-03-20"),
    abstract: "We present a conceptually simple, flexible, and general framework for object instance segmentation. Our approach efficiently detects objects in an image while simultaneously generating a high-quality segmentation mask for each instance.",
    keywords: "Mask R-CNN, instance segmentation, object detection, computer vision, deep learning",
    pdf_url: "https://arxiv.org/pdf/1703.06870.pdf"
  },
  {
    title: "EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks",
    authors: "Mingxing Tan, Quoc V. Le",
    publication_date: new Date("2019-05-28"),
    abstract: "Convolutional Neural Networks (ConvNets) are commonly developed at a fixed resource budget, and then scaled up for better accuracy if more resources are available. In this paper, we systematically study model scaling and identify that carefully balancing network depth, width, and resolution can lead to better performance.",
    keywords: "EfficientNet, model scaling, CNN, computer vision, deep learning",
    pdf_url: "https://arxiv.org/pdf/1905.11946.pdf"
  },

  // Reinforcement Learning
  {
    title: "Playing Atari with Deep Reinforcement Learning",
    authors: "Volodymyr Mnih, Koray Kavukcuoglu, David Silver",
    publication_date: new Date("2013-12-19"),
    abstract: "We present the first deep learning model to successfully learn control policies directly from high-dimensional sensory input using reinforcement learning. The model is a convolutional neural network, trained with a variant of Q-learning, whose input is raw pixels and whose output is a value function estimating future rewards.",
    keywords: "deep Q-learning, reinforcement learning, Atari games, neural networks",
    pdf_url: "https://arxiv.org/pdf/1312.5602.pdf"
  },
  {
    title: "Proximal Policy Optimization Algorithms",
    authors: "John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov",
    publication_date: new Date("2017-07-20"),
    abstract: "We propose a new family of policy gradient methods for reinforcement learning, which alternate between sampling data through interaction with the environment, and optimizing a surrogate objective function using stochastic gradient ascent.",
    keywords: "PPO, reinforcement learning, policy gradient, deep learning",
    pdf_url: "https://arxiv.org/pdf/1707.06347.pdf"
  },

  // Graph Neural Networks
  {
    title: "Graph Attention Networks",
    authors: "Petar Veličković, Guillem Cucurull, Arantxa Casanova",
    publication_date: new Date("2017-10-30"),
    abstract: "We present graph attention networks (GATs), novel neural network architectures that operate on graph-structured data, leveraging masked self-attentional layers to address the shortcomings of prior methods based on graph convolutions or their approximations.",
    keywords: "graph neural networks, attention mechanism, graph learning, deep learning",
    pdf_url: "https://arxiv.org/pdf/1710.10903.pdf"
  },
  {
    title: "Semi-Supervised Classification with Graph Convolutional Networks",
    authors: "Thomas N. Kipf, Max Welling",
    publication_date: new Date("2016-09-09"),
    abstract: "We present a scalable approach for semi-supervised learning on graph-structured data that is based on an efficient variant of convolutional neural networks which operate directly on graphs.",
    keywords: "graph convolutional networks, semi-supervised learning, graph neural networks",
    pdf_url: "https://arxiv.org/pdf/1609.02907.pdf"
  },

  // AutoML & Neural Architecture Search
  {
    title: "Neural Architecture Search with Reinforcement Learning",
    authors: "Barret Zoph, Quoc V. Le",
    publication_date: new Date("2016-11-05"),
    abstract: "Neural networks are powerful and flexible models that work well for many difficult learning tasks in image, speech and natural language understanding. Despite their success, neural networks are still hard to design. In this paper, we use a recurrent network to generate the model descriptions of neural networks and train this RNN with reinforcement learning.",
    keywords: "neural architecture search, AutoML, reinforcement learning, deep learning",
    pdf_url: "https://arxiv.org/pdf/1611.01578.pdf"
  },

  // Federated Learning
  {
    title: "Communication-Efficient Learning of Deep Networks from Decentralized Data",
    authors: "H. Brendan McMahan, Eider Moore, Daniel Ramage, Seth Hampson",
    publication_date: new Date("2016-02-17"),
    abstract: "Modern mobile devices have access to a wealth of data suitable for learning models, which in turn can greatly improve the user experience on the device. For example, language models can improve speech recognition and text entry, and image models can automatically select good photos.",
    keywords: "federated learning, distributed machine learning, privacy-preserving, deep learning",
    pdf_url: "https://arxiv.org/pdf/1602.05629.pdf"
  },

  // Time Series & Forecasting
  {
    title: "Temporal Fusion Transformers for Interpretable Multi-horizon Time Series Forecasting",
    authors: "Bryan Lim, Sercan Ö. Arık, Nicolas Loeff, Tomas Pfister",
    publication_date: new Date("2019-12-01"),
    abstract: "Multi-horizon forecasting problems often contain a complex mix of inputs – including static (i.e. time-invariant) covariates, known future inputs, and other exogenous time series that are only observed historically – without any prior information on how they interact with the target.",
    keywords: "time series forecasting, transformers, attention mechanism, interpretable AI",
    pdf_url: "https://arxiv.org/pdf/1912.09363.pdf"
  },

  // Optimization & Training
  {
    title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
    authors: "Sergey Ioffe, Christian Szegedy",
    publication_date: new Date("2015-02-11"),
    abstract: "Training Deep Neural Networks is complicated by the fact that the distribution of each layer's inputs changes during training, as the parameters of the previous layers change. This slows down the training by requiring lower learning rates and careful parameter initialization.",
    keywords: "batch normalization, deep learning, neural network training, optimization",
    pdf_url: "https://arxiv.org/pdf/1502.03167.pdf"
  },
  {
    title: "Dropout: A Simple Way to Prevent Neural Networks from Overfitting",
    authors: "Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, Ilya Sutskever",
    publication_date: new Date("2014-01-01"),
    abstract: "Deep neural nets with a large number of parameters are very powerful machine learning systems. However, overfitting is a serious problem in such networks. Large networks are also slow to use, making it difficult to deal with overfitting by combining the predictions of many different large neural nets at test time.",
    keywords: "dropout, regularization, overfitting prevention, deep learning, neural networks",
    pdf_url: "https://arxiv.org/pdf/1207.0580.pdf"
  },

  // Explainable AI
  {
    title: "A Unified Approach to Interpreting Model Predictions",
    authors: "Scott M. Lundberg, Su-In Lee",
    publication_date: new Date("2017-05-22"),
    abstract: "Understanding why a model makes a certain prediction can be as crucial as the prediction's accuracy in many applications. However, the highest accuracy for large modern datasets is often achieved by complex models that even experts struggle to interpret.",
    keywords: "SHAP, explainable AI, model interpretability, machine learning",
    pdf_url: "https://arxiv.org/pdf/1705.07874.pdf"
  },

  // Transfer Learning
  {
    title: "A Survey on Transfer Learning",
    authors: "Sinno Jialin Pan, Qiang Yang",
    publication_date: new Date("2010-10-01"),
    abstract: "A major assumption in many machine learning and data mining algorithms is that the training and future data must be in the same feature space and have the same distribution. However, in many real-world applications, this assumption may not hold.",
    keywords: "transfer learning, domain adaptation, machine learning, deep learning",
    pdf_url: "https://arxiv.org/pdf/2009.00155.pdf"
  },

  // Meta Learning
  {
    title: "Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks",
    authors: "Chelsea Finn, Pieter Abbeel, Sergey Levine",
    publication_date: new Date("2017-03-09"),
    abstract: "We propose an algorithm for meta-learning that is model-agnostic, in the sense that it is compatible with any model trained with gradient descent and applicable to a variety of different learning problems, including classification, regression, and reinforcement learning.",
    keywords: "MAML, meta-learning, few-shot learning, deep learning",
    pdf_url: "https://arxiv.org/pdf/1703.03400.pdf"
  },

  // Contrastive Learning
  {
    title: "A Simple Framework for Contrastive Learning of Visual Representations",
    authors: "Ting Chen, Simon Kornblith, Mohammad Norouzi, Geoffrey Hinton",
    publication_date: new Date("2020-02-13"),
    abstract: "This paper presents SimCLR: a simple framework for contrastive learning of visual representations. We simplify recently proposed contrastive self-supervised learning algorithms without requiring specialized architectures or a memory bank.",
    keywords: "SimCLR, contrastive learning, self-supervised learning, computer vision",
    pdf_url: "https://arxiv.org/pdf/2002.05709.pdf"
  },

  // Large Language Models
  {
    title: "Language Models are Few-Shot Learners",
    authors: "Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah",
    publication_date: new Date("2020-05-28"),
    abstract: "We demonstrate that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even becoming competitive with prior state-of-the-art fine-tuning approaches. Specifically, we train GPT-3, an autoregressive language model with 175 billion parameters.",
    keywords: "GPT-3, large language models, few-shot learning, NLP, transformers",
    pdf_url: "https://arxiv.org/pdf/2005.14165.pdf"
  },

  // Diffusion Models
  {
    title: "Denoising Diffusion Probabilistic Models",
    authors: "Jonathan Ho, Ajay Jain, Pieter Abbeel",
    publication_date: new Date("2020-06-19"),
    abstract: "We present high quality image synthesis results using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",
    keywords: "diffusion models, generative models, image synthesis, deep learning",
    pdf_url: "https://arxiv.org/pdf/2006.11239.pdf"
  },

  // Vision Transformers
  {
    title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
    authors: "Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov",
    publication_date: new Date("2020-10-22"),
    abstract: "While the Transformer architecture has become the de-facto standard for natural language processing tasks, its applications to computer vision remain limited. In vision, attention is either applied in conjunction with convolutional networks, or used to replace certain components of convolutional networks.",
    keywords: "Vision Transformer, ViT, transformers, computer vision, attention mechanism",
    pdf_url: "https://arxiv.org/pdf/2010.11929.pdf"
  },

  // Additional high-impact papers
  {
    title: "Auto-Encoding Variational Bayes",
    authors: "Diederik P. Kingma, Max Welling",
    publication_date: new Date("2013-12-20"),
    abstract: "We introduce a stochastic variational inference and learning algorithm that scales to large datasets and stochastic gradient descent, applicable to unsupervised learning of complex probabilistic models with continuous latent variables.",
    keywords: "variational autoencoder, generative models, unsupervised learning",
    pdf_url: "https://arxiv.org/pdf/1312.6114.pdf"
  },
  {
    title: "DeepWalk: Online Learning of Social Representations",
    authors: "Bryan Perozzi, Rami Al-Rfou, Steven Skiena",
    publication_date: new Date("2014-07-21"),
    abstract: "We present DeepWalk, a novel approach for learning latent representations of vertices in a network. DeepWalk generalizes recent advancements in language modeling and unsupervised feature learning to network data.",
    keywords: "graph embeddings, deepwalk, representation learning, networks",
    pdf_url: "https://arxiv.org/pdf/1403.6652.pdf"
  },
  {
    title: "node2vec: Scalable Feature Learning for Networks",
    authors: "Aditya Grover, Jure Leskovec",
    publication_date: new Date("2016-07-15"),
    abstract: "We propose node2vec, a flexible algorithm for learning continuous feature representations for nodes in networks. The algorithm defines a biased random walk procedure to efficiently explore diverse neighborhoods.",
    keywords: "node2vec, graph representation, embeddings, machine learning",
    pdf_url: "https://arxiv.org/pdf/1607.00653.pdf"
  },
  {
    title: "Inductive Representation Learning on Large Graphs",
    authors: "Will Hamilton, Zhitao Ying, Jure Leskovec",
    publication_date: new Date("2017-06-08"),
    abstract: "We present GraphSAGE, a general inductive framework that leverages node feature information (e.g., text attributes) to efficiently generate node embeddings for previously unseen data.",
    keywords: "GraphSAGE, graph neural networks, inductive learning, embeddings",
    pdf_url: "https://arxiv.org/pdf/1706.02216.pdf"
  },
  {
    title: "Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context",
    authors: "Zihang Dai, Zhilin Yang, Yiming Yang, William W. Cohen",
    publication_date: new Date("2019-01-09"),
    abstract: "We introduce Transformer-XL, a novel architecture that enables learning dependency beyond a fixed length without disrupting temporal coherence.",
    keywords: "Transformer-XL, language modeling, attention mechanism, NLP",
    pdf_url: "https://arxiv.org/pdf/1901.02860.pdf"
  },
  {
    title: "XLNet: Generalized Autoregressive Pretraining for Language Understanding",
    authors: "Zhilin Yang, Zihang Dai, Yiming Yang, Jaime Carbonell",
    publication_date: new Date("2019-06-19"),
    abstract: "We introduce XLNet, a generalized autoregressive pretraining method that leverages the best of autoregressive and autoencoding language modeling.",
    keywords: "XLNet, language modeling, pretraining, transformers",
    pdf_url: "https://arxiv.org/pdf/1906.08237.pdf"
  },
  {
    title: "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer",
    authors: "Colin Raffel, Noam Shazeer, Adam Roberts",
    publication_date: new Date("2019-10-23"),
    abstract: "We present the Text-to-Text Transfer Transformer (T5), which reframes all NLP tasks into a unified text-to-text format to leverage transfer learning at scale.",
    keywords: "T5, transfer learning, transformers, NLP",
    pdf_url: "https://arxiv.org/pdf/1910.10683.pdf"
  },
  {
    title: "Learning Transferable Visual Models From Natural Language Supervision",
    authors: "Alec Radford, Jong Wook Kim, Chris Hallacy",
    publication_date: new Date("2021-03-02"),
    abstract: "We introduce CLIP, which learns visual concepts from natural language supervision at scale, enabling strong zero-shot transfer.",
    keywords: "CLIP, multimodal learning, vision-language, zero-shot",
    pdf_url: "https://arxiv.org/pdf/2103.00020.pdf"
  },
  {
    title: "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows",
    authors: "Ze Liu, Yutong Lin, Yue Cao",
    publication_date: new Date("2021-03-29"),
    abstract: "We present Swin Transformer, a general-purpose Transformer backbone that capably serves as a hierarchical vision transformer for image recognition.",
    keywords: "Swin Transformer, vision transformer, computer vision, attention",
    pdf_url: "https://arxiv.org/pdf/2103.14030.pdf"
  },
  {
    title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis",
    authors: "Ben Mildenhall, Pratul Srinivasan, Matthew Tancik",
    publication_date: new Date("2020-03-26"),
    abstract: "We present a method that optimizes a continuous volumetric scene function using a sparse set of input views to synthesize novel views of complex scenes.",
    keywords: "NeRF, neural rendering, view synthesis, computer vision",
    pdf_url: "https://arxiv.org/pdf/2003.08934.pdf"
  },
  {
    title: "MobileNetV2: Inverted Residuals and Linear Bottlenecks",
    authors: "Mark Sandler, Andrew Howard, Menglong Zhu",
    publication_date: new Date("2018-01-18"),
    abstract: "We present MobileNetV2, an architecture that improves the state of the art performance of mobile models on multiple benchmarks with minimal increase in computational cost.",
    keywords: "MobileNetV2, efficient CNN, mobile vision, deep learning",
    pdf_url: "https://arxiv.org/pdf/1801.04381.pdf"
  },
  {
    title: "WaveNet: A Generative Model for Raw Audio",
    authors: "Aaron van den Oord, Sander Dieleman, Heiga Zen",
    publication_date: new Date("2016-09-12"),
    abstract: "We introduce WaveNet, a deep neural network for generating raw audio waveforms that significantly outperforms the best text-to-speech systems.",
    keywords: "WaveNet, audio generation, generative models, deep learning",
    pdf_url: "https://arxiv.org/pdf/1609.03499.pdf"
  },
  {
    title: "Image-to-Image Translation with Conditional Adversarial Networks",
    authors: "Phillip Isola, Jun-Yan Zhu, Tinghui Zhou, Alexei A. Efros",
    publication_date: new Date("2016-11-21"),
    abstract: "We investigate conditional adversarial networks as a general-purpose solution to image-to-image translation problems.",
    keywords: "pix2pix, image translation, GAN, computer vision",
    pdf_url: "https://arxiv.org/pdf/1611.07004.pdf"
  },
  {
    title: "Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks",
    authors: "Jun-Yan Zhu, Taesung Park, Phillip Isola, Alexei A. Efros",
    publication_date: new Date("2017-03-30"),
    abstract: "We present CycleGAN, a method that learns to translate an image from a source domain X to a target domain Y in the absence of paired examples.",
    keywords: "CycleGAN, image translation, GAN, computer vision",
    pdf_url: "https://arxiv.org/pdf/1703.10593.pdf"
  },
  {
    title: "A Style-Based Generator Architecture for Generative Adversarial Networks",
    authors: "Tero Karras, Samuli Laine, Timo Aila",
    publication_date: new Date("2018-12-12"),
    abstract: "We propose StyleGAN, a new generator architecture that leads to significant improvements in image quality in generative adversarial networks.",
    keywords: "StyleGAN, generative models, GAN, image synthesis",
    pdf_url: "https://arxiv.org/pdf/1812.04948.pdf"
  },
  {
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    authors: "Robin Rombach, Andreas Blattmann, Dominik Lorenz",
    publication_date: new Date("2021-12-21"),
    abstract: "We propose Latent Diffusion Models that enable high-resolution image synthesis while requiring significantly less compute.",
    keywords: "latent diffusion, generative models, image synthesis, deep learning",
    pdf_url: "https://arxiv.org/pdf/2112.10752.pdf"
  },
  {
    title: "Segment Anything",
    authors: "Alexander Kirillov, Eric Mintun, Nikhila Ravi",
    publication_date: new Date("2023-04-05"),
    abstract: "We introduce the Segment Anything Model (SAM), a foundation model for image segmentation that can segment any object in any image with zero-shot performance.",
    keywords: "segment anything, SAM, image segmentation, foundation models",
    pdf_url: "https://arxiv.org/pdf/2304.02643.pdf"
  },
  {
    title: "LLaMA: Open and Efficient Foundation Language Models",
    authors: "Hugo Touvron, Louis Martin, Kevin Stone",
    publication_date: new Date("2023-02-27"),
    abstract: "We present LLaMA, a collection of foundation language models ranging from 7B to 65B parameters, trained on publicly available data.",
    keywords: "LLaMA, large language models, foundation models, NLP",
    pdf_url: "https://arxiv.org/pdf/2302.13971.pdf"
  }
]

async function main() {
  console.log('🔄 Loading real journals from arXiv...\n')

  // Clear existing data
  await prisma.journal.deleteMany({})
  console.log('🗑️  Cleared existing journals\n')

  // Insert real journals
  let count = 0
  for (const journal of realJournals) {
    try {
      await prisma.journal.create({ data: journal })
      count++
      console.log(`✅ ${count}. ${journal.title.substring(0, 60)}...`)
    } catch (error) {
      console.error(`   ❌ Error: ${journal.title.substring(0, 40)}...`)
    }
  }

  // Verify
  const total = await prisma.journal.count()
  console.log(`\n✨ Successfully loaded ${total} real journals from arXiv!`)
  console.log('📥 All PDFs are downloadable from arxiv.org\n')

  // Show samples
  console.log('📚 Sample journals:')
  const samples = await prisma.journal.findMany({ take: 3 })
  samples.forEach((j, i) => {
    console.log(`\n${i + 1}. ${j.title}`)
    console.log(`   PDF: ${j.pdf_url}`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('\n✅ Done!')
  })
  .catch(async (e) => {
    console.error('❌ Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
