export interface Option{
  id:number;
  value:string[]; 
}

export interface QuestionStorage{
  id: number;
  domain: string;
  question:string;
  example: string;
  optId:number;  
}

export const options: Option[] =[
 
  { id: 1, value:  [
    "Very High",
    "High",
    "Medium Impact",
    "Low",
    "Very Low"
  ], },
  { id: 2, value:   [
    "Very Easy",
    "Easy",
    "Medium",
    "Hard",
    "Very Hard",
    "Not Possible"
  ], },
  { id: 3, value:  [
    "No manual feature engineering",
    "Basic manual feature engineering",
    "Extensive manual feature engineering"
  ],  },
  { id: 4, value:  [
    "None",
    "Basic",
    "Extensive"
  ],  },
  { id: 5, value:    [
    "Very Insecure",
    "Insecure",
    "Moderately Secure",
    "Secure",
    "Very Secure"
  ],  },
  { id: 6, value:   [
    "Always",
    "Often",
    "Sometimes",
    "Rarely",
    "Very Rarely"
  ],  },
  { id: 7, value: [
    "Full access to the models flow",
    "Decision-based",
    "Score-based",
    "No feedback"
  ],  },
  { id: 8, value: [
    "Fine Tuning",
    "Train From Scratch"
  ],  },
  { id: 9, value: [
    "No Evaluation",
    "Yes, but without A/B testing",
    "Yes, with A/B testing"
  ],  },
  { id: 10, value: [
    "Complete Knowledge",
    "Partial Knowledge (Raw Data)",
    "Limited Knowledge (Data Property)",
    "Little to No Knowledge"
  ],  },
  { id: 11, value:  [
    "Complete Knowledge",
    "Known architecture",
    "Hyperparam",
    "Algorithm",
    "Task",
    "Unknown"
  ],  },
  { id: 12, value:  [
    "Deep Learning",
    "Ensemble",
    "Decision Trees",
    "Standard ML (e.g., SVM, k-means,…)"
  ],  },
  { id: 13, value:  [
    "Classification",
    "Semi supervised",
    "unsupervised (clustering)",
    "Regression",
    "Reinforcement learning",
    "Object Detection",
    "LLM"
  ],  },

  { id: 14, value:   [
    "Images (computer vision)",
    "Text (NLP)",
    "Tabular",
    "Voice"
  ],  },

  { id: 15, value:   [
    "Cyber",
    "Finance",
    "Computer Vision",
    "Speech",
    "Recommender system",
    "Network",
    "NLP (TEXT)"
  ],  },

  { id: 16, value:    [
    "No impact at all",
    "Minimal impact (1%-2%)",
    "Some impact (up to 5%)",
    "Moderate impact (5%-10%)",
    "Extended impact (10%-15%)"
  ],  },
  { id: 17, value:  [
    "Very Relevant",
    "Relevant",
    "Somewhat relevant",
    "Almost not relevant",
    "Not relevant at all"
  ],  },
  { id: 18, value:   [
    "aishell-1",
    "AlphaGo Zero",
    "Amazon",
    "Baidu Apollo real-world LiDAR data",
    "Bird&Bicycle",
    "CASIA-WebFace",
    "CIFAR",
    "COCO",
    "CSTR VCTK Corpus",
    "Chest X-Ray",
    "Dermofit",
    "Dermoscopy",
    "Fundoscopy",
    "GNU radio ML dataset RML2016.10a",
    "Google",
    "Google",
    "GTSRB",
    "HMDB-51",
    "IMDB",
    "ILSVRC",
    "IEEE",
    "ImageNet",
    "Kaggle",
    "Kinetics-400",
    "LFW",
    "LISA",
    "Libri",
    "LOBSTER centisecond-resolution data",
    "METR-LA",
    "MNIST",
    "MS-COCO",
    "MR",
    "MultiMNIST",
    "NoGo",
    "NSL-KDD",
    "OASIS",
    "PEMS-BAY",
    "PIPA",
    "Places365",
    "Power system",
    "RML",
    "Spoken commands",
    "T1w 3D MRI images",
    "TALFW",
    "Tiny-Imagenet",
    "UCF-101",
    "VoxCeleb1",
    "WSJ",
    "YOHO"
  ],  },
  { id: 19, value:   [
    "12-layer convnet",
    "Alexnet",
    "AllConv",
    "Amazon",
    "ASR systems",
    "Att2in",
    "Baidu Apollo",
    "BLE IoT devices",
    "Bottom-up Top-down",
    "CIFAR",
    "CNN",
    "Commercial APIs",
    "Context-aware model",
    "DenseNet",
    "DNN",
    "DT",
    "End-to-end deep neural network",
    "Facebook fastText",
    "GMM-UBM",
    "GooglLeNet",
    "Google",
    "GraphWaveNet",
    "Hash",
    "IBM",
    "I3D",
    "ImageNet",
    "Inc",
    "Inception",
    "J48",
    "Kaldi",
    "KNN",
    "LeNet",
    "Linear classifiers",
    "Lingvo",
    "LR",
    "LSTM",
    "MCTS",
    "MFCC",
    "Microsoft Azure",
    "Microsoft Cortana",
    "MLP",
    "MobileFaceNet",
    "MobileNet",
    "MNIST",
    "NB",
    "nasnet",
    "NiN",
    "NTIMIT",
    "PDQ",
    "PLDA",
    "Policy-Value neural network (PV-NN)",
    "Random Forest",
    "ResNet",
    "RF",
    "ROBERTa",
    "RNN-ADV",
    "SegNet",
    "SqueezeNet",
    "SVM",
    "Talentedsoft",
    "UNet",
    "VGG",
    "vit",
    "WRN",
    "X-vector",
    "YOLO"
  ],  },   
  ]
  




export const questionsStorage: QuestionStorage[] = [
  { id: 1,domain:'Impact', question: "Specific Input Manipulation: How severe would the impact be if an attacker caused the model to provide incorrect outputs for specific inputs they selected?",example:" A fraud detection model incorrectly approves transactions flagged by the attacker",optId:1 },
  { id: 2,domain:'Impact', question: "Global Output Corruption: How severe would the impact be if an attacker caused the model to produce wrong outputs for every input?",example:" A recommendation system consistently suggests irrelevant or harmful content.",optId:1 },
  { id: 3,domain:'Impact', question: "How severe would the impact be if a pre-defined trigger in the inputs caused the model to produce incorrect outputs?",example:" A specific phrase in a document bypasses a text moderation model.",optId:1 },
  { id: 4,domain:'Impact', question: "Targeted Attack",example: "",optId:1 },
  { id: 5,domain:'Impact', question: "How severe would the impact be if an attacker could identify whether specific data samples were used in training? (know which instances were included in the training set)",example:"Example: An attacker manipulates a financial model so that transactions from a specific region are consistently flagged as high-risk, regardless of their actual attributes, influencing decisions for this subset without relying on explicit triggers.",optId:1 },
  { id: 6,domain:'Impact', question: "Training Data Property Inference (T5): How severe would the impact be if an attacker inferred general properties of the training data (e.g., feature distributions, input types)?",example:"Example: A malicious actor determines a user’s medical record was part of a training dataset",optId:1 },
  { id: 7,domain:'Impact', question: "Training Data Exposure (T6): How severe would the impact be if an attacker leaked some or all of the training data?",example:"Example: An attacker deduces the demographic makeup of a training dataset.",optId:1 },
  { id: 8,domain:'Impact', question: "Model Replication (T7): How severe would the impact be if an attacker extracted enough information to replicate your model?",example:"Example: Customer data used for training a recommendation system is exposed.",optId:1},
  { id: 9,domain:'Impact', question: "Resource Exhaustion - Global (T8): How severe would the impact be if an attacker caused the ML model to use excessive resources (e.g., energy, time) for all inputs at inference time?",example:"Example: An attacker uses API queries to recreate a model for commercial gain",optId:1},
  { id: 10,domain:'Impact', question: "Resource Exhaustion - Specific Inputs (T9): How severe would the impact be if an attacker caused the ML model to use excessive resources for specific inputs at inference time?",example:"Example: When processing certain inputs, the system experiences disproportionate delays, with higher-than-usual energy or computational requirements, while other inputs are processed normally.",optId:1 },
  { id: 11,domain:'Impact', question: "Resource Exhaustion - Training Phase (T10): How severe would the impact be if an attacker caused the training process to use excessive resources (e.g., energy consumption, time, etc.)?",example:"Example: The training process becomes inefficient, taking longer and consuming more computational resources than expected.",optId:1},


  { id: 12,domain:'Capabilty', question: " How easy is it for the threat actor to compromise the data used for training or re-training the model?",example:" A fraud detection model incorrectly approves transactions flagged by the attacker",optId:2 },
  { id: 13,domain:'Capabilty', question: "DELETED QUESTION",example:" A recommendation system consistently suggests irrelevant or harmful content.",optId:2 },
  { id: 14,domain:'Capabilty', question: "DELETED QUESTION",example:" A specific phrase in a document bypasses a text moderation model.",optId:2 },
  { id: 15,domain:'Capabilty', question: " Do you perform any type of manual feature engineering?", example:"None",optId:2},
  { id: 16,domain:'Capabilty', question: "What level of Training data validation (e.g., cleaning, filtering, OOD/anomaly detection) is performed?",example:"Example: An attacker manipulates a financial model so that transactions from a specific region are consistently flagged as high-risk, regardless of their actual attributes, influencing decisions for this subset without relying on explicit triggers.",optId:3},
  { id: 17,domain:'Capabilty', question: "What level of data validation (e.g., cleaning, filtering, OOD/anomaly detection) is performed? (At inferance - when the system is already deployed)",example:"Example: A malicious actor determines a user’s medical record was part of a training dataset",optId:4},
  { id: 18,domain:'Capabilty', question: "How secure are your model’s parameters against unauthorized changes? (e.g., sending malicious updates)",example:"Example: An attacker deduces the demographic makeup of a training dataset.",optId:4 },
  { id: 19,domain:'Capabilty', question: "How often do you retrain the model?",example:"Example: Customer data used for training a recommendation system is exposed.",optId:5 },
  { id: 20,domain:'Capabilty', question: "What feedback is accessible to the threat actor during the model's training process? (Feedback refers to any information the threat actor could potentially access about the model's behavior or decisions during training.)",example:"Example: An attacker uses API queries to recreate a model for commercial gain",optId:6 },
  { id: 21,domain:'Capabilty', question: "When retraining the model, do you retrain it from scratch or do you perform fine-tuning or transfer learning?",example:"Example: When processing certain inputs, the system experiences disproportionate delays, with higher-than-usual energy or computational requirements, while other inputs are processed normally.",optId:7 },
  { id: 22,domain:'Capabilty', question: "Do you conduct online evaluation of your models? Does this include A/B testing?",example:"Example: The training process becomes inefficient, taking longer and consuming more computational resources than expected.",optId:8},
  { id: 23,domain:'Capabilty', question: "How easy is it for the threat actor to manipulate the model’s inputs digitally at serving time? (e.g., via an accessible API)",example:" A recommendation system consistently suggests irrelevant or harmful content.",optId:9},
  { id: 24,domain:'Capabilty', question: "How easy is it for the threat actor to manipulate the model’s inputs physically at serving time? (e.g., placing an adversarial object in front of a sensor)",example:" A specific phrase in a document bypasses a text moderation model.",optId:1 },
  { id: 25,domain:'Capabilty', question: " What is the feedback provided to model's users during serving time?",example:" A recommendation system consistently suggests irrelevant or harmful content.",optId:2},
  { id: 26,domain:'Capabilty', question: "What can the threat actor know about the data collected, processed, and used for training?",example:" A specific phrase in a document bypasses a text moderation model.",optId:7 },
  { id: 27,domain:'Capabilty', question: "How easy is it for the threat actor to obtain training data samples used for training the model, or reference data which is similar to the data used for training the model?",example:" A recommendation system consistently suggests irrelevant or harmful content.",optId:10 },
  { id: 28,domain:'Capabilty', question: "How much information does the threat actor have about the model’s design, training process, or deployment setup?",example:" A specific phrase in a document bypasses a text moderation model.",optId:2},
  { id: 29,domain:'Capabilty', question: "How easy is it for the threat actor to access system metrics?\n(e.g., time, energy consumption, CPU)",example:" A recommendation system consistently suggests irrelevant or harmful content.",optId:10 },
 



  { id: 30,domain:'Model Type & Risk', question: "What type of model do you use in the selected use case?\n(Choose the option that best describes your model’s architecture or technique.)",example:" A fraud detection model incorrectly approves transactions flagged by the attacker",optId:12 },
  { id: 31,domain:'Model Type & Risk', question: "What type of task is your model solving?\n(Indicates the primary task the model is designed for.)",example:" A recommendation system consistently suggests irrelevant or harmful content.",optId:13 },
  { id: 32,domain:'Model Type & Risk', question: "What type of data is your model using? (Select the type of data processed by the model.)",example:" A specific phrase in a document bypasses a text moderation model.",optId:14 },
  { id: 33,domain:'Model Type & Risk', question: "What is the domain of your use case?\n(Identify the application area your model is serving.)", example:"none",optId:15 },
  { id: 34,domain:'Model Type & Risk', question: "What is the maximal acceptable impact on model accuracy (compared to the best achievable performance)?",example:"Example: An attacker manipulates a financial model so that transactions from a specific region are consistently flagged as high-risk, regardless of their actual attributes, influencing decisions for this subset without relying on explicit triggers.",optId:16},
  { id: 35,domain:'Model Type & Risk', question: "What is the required level of protection against evasion attacks?",example:"Example: A malicious actor determines a user’s medical record was part of a training dataset",optId:1 },
  { id: 36,domain:'Model Type & Risk', question: "What is the required level of protection against model corruption attacks (i.e., making the model's prediction useless)?",example:"Example: An attacker deduces the demographic makeup of a training dataset.",optId:1},
  { id: 37,domain:'Model Type & Risk', question: "What is the required level of protection against data privacy attacks (i.e., membership inference, data reconstruction, property inference)?",example:"Example: Customer data used for training a recommendation system is exposed.",optId:1 },
  { id: 38,domain:'Model Type & Risk', question: "What is the required level of protection against model privacy attacks (i.e., model stealing, model extraction)?",example:"Example: An attacker uses API queries to recreate a model for commercial gain",optId:1 },
  { id: 39,domain:'Model Type & Risk', question: "What is the required level of protection against resource exhaustion attacks (e.g., extending prediction runtime)?",example:"Example: When processing certain inputs, the system experiences disproportionate delays, with higher-than-usual energy or computational requirements, while other inputs are processed normally.",optId:1},
  { id: 40,domain:'Model Type & Risk', question: "How relevant is model bias in your use case?",example:"Example: The training process becomes inefficient, taking longer and consuming more computational resources than expected.",optId:17 },
  {id:41, domain:'Model Type & Risk', question:" Do you use known datasets to train your model? (Select all that apply.) for your convinience - the options are categorized by domains",example:'',optId:18},
  {id: 42,domain:'Model Type & Risk', question: 'Do you use known model architectures in your system? (Select all that apply.)', example:"",optId:19}
];
