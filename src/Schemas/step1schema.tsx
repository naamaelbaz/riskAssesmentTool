export interface Option{
  id:number;
  value:string
}

export interface OptionQ{
  id:number;
  value:Option[]; 
}

export interface QuestionStorage{
  id: number;
  domain: string;
  question:string;
  example: string;
  optId:number;  
}

export const options: OptionQ[] =[
 
  { id: 1, value:[
    {id: 1, value:"Very High"},
    {id: 2, value:"High"},
    {id: 3, value:"Medium Impact"},
    {id: 4, value:"Low"},
    {id: 5, value:"Very Low"}
  ], },
  { id: 2, value:[
    {id: 1, value:"Very Easy"},
    {id: 2, value:"Easy"},
    {id: 3, value:"Medium"},
    {id: 4, value:"Hard"},
    {id: 5, value:"Very Hard"},
    {id:6, value: "Not Possible"}
  ], },
  { id: 3, value: [
    {id: 1, value: "No manual feature engineering"},
    {id: 2, value: "Basic manual feature engineering"},
    {id: 3, value: "Extensive manual feature engineering"}
  ] },
  { id: 4, value: [
    {id: 1, value: "None"},
    {id: 2, value: "Basic"},
    {id: 3, value: "Extensive"}
  ] },
  { id: 5, value: [
    {id: 1, value: "Very Insecure"},
    {id: 2, value: "Insecure"},
    {id: 3, value: "Moderately Secure"},
    {id: 4, value: "Secure"},
    {id: 5, value: "Very Secure"}
  ] },
  { id: 6, value: [
    {id: 1, value: "Always"},
    {id: 2, value: "Often"},
    {id: 3, value: "Sometimes"},
    {id: 4, value: "Rarely"},
    {id: 5, value: "Very Rarely"}
  ] },
  { id: 7, value: [
    {id: 1, value: "Full access to the models flow"},
    {id: 2, value: "Decision-based"},
    {id: 3, value: "Score-based"},
    {id: 4, value: "No feedback"}
  ] },
  { id: 8, value: [
    {id: 1, value: "Fine Tuning"},
    {id: 2, value: "Train From Scratch"}
  ] },
  { id: 9, value: [
    {id: 1, value: "No Evaluation"},
    {id: 2, value: "Yes, but without A/B testing"},
    {id: 3, value: "Yes, with A/B testing"}
  ] },
  { id: 10, value: [
    {id: 1, value: "Complete Knowledge"},
    {id: 2, value: "Partial Knowledge (Raw Data)"},
    {id: 3, value: "Limited Knowledge (Data Property)"},
    {id: 4, value: "Little to No Knowledge"}
  ] },
  { id: 11, value: [
    {id: 1, value: "Complete Knowledge"},
    {id: 2, value: "Known architecture"},
    {id: 3, value: "Hyperparam"},
    {id: 4, value: "Algorithm"},
    {id: 5, value: "Task"},
    {id: 6, value: "Unknown"}
  ] },
  { id: 12, value: [
    {id: 1, value: "Deep Learning"},
    {id: 2, value: "Ensemble"},
    {id: 3, value: "Decision Trees"},
    {id: 4, value: "Standard ML (e.g., SVM, k-means,…)"}
  ] },
  { id: 13, value: [
    {id: 1, value: "Classification"},
    {id: 2, value: "Semi supervised"},
    {id: 3, value: "Unsupervised (clustering)"},
    {id: 4, value: "Regression"},
    {id: 5, value: "Reinforcement learning"},
    {id: 6, value: "Object Detection"},
    {id: 7, value: "LLM"}
  ] },
  { id: 14, value: [
    {id: 1, value: "Images (computer vision)"},
    {id: 2, value: "Text (NLP)"},
    {id: 3, value: "Tabular"},
    {id: 4, value: "Voice"}
  ] },
  { id: 15, value: [
    {id: 1, value: "Cyber"},
    {id: 2, value: "Finance"},
    {id: 3, value: "Computer Vision"},
    {id: 4, value: "Speech"},
    {id: 5, value: "Recommender system"},
    {id: 6, value: "Network"},
    {id: 7, value: "NLP (TEXT)"}
  ] },
  { id: 16, value: [
    {id: 1, value: "No impact at all"},
    {id: 2, value: "Minimal impact (1%-2%)"},
    {id: 3, value: "Some impact (up to 5%)"},
    {id: 4, value: "Moderate impact (5%-10%)"},
    {id: 5, value: "Extended impact (10%-15%)"}
  ] },
  { id: 17, value: [
    {id: 1, value: "Very Relevant"},
    {id: 2, value: "Relevant"},
    {id: 3, value: "Somewhat relevant"},
    {id: 4, value: "Almost not relevant"},
    {id: 5, value: "Not relevant at all"}
  ] },
  { id: 17, value: [
    {id: 1, value: "Very Relevant"},
    {id: 2, value: "Relevant"},
    {id: 3, value: "Somewhat relevant"},
    {id: 4, value: "Almost not relevant"},
    {id: 5, value: "Not relevant at all"}
  ] },
  { id: 18, value: [
    {id: 1, value: "aishell-1"},
    {id: 2, value: "AlphaGo Zero"},
    {id: 3, value: "Amazon"},
    {id: 4, value: "Baidu Apollo real-world LiDAR data"},
    {id: 5, value: "Bird&Bicycle"},
    {id: 6, value: "CASIA-WebFace"},
    {id: 7, value: "CIFAR"},
    {id: 8, value: "COCO"},
    {id: 9, value: "CSTR VCTK Corpus"},
    {id: 10, value: "Chest X-Ray"},
    {id: 11, value: "Dermofit"},
    {id: 12, value: "Dermoscopy"},
    {id: 13, value: "Fundoscopy"},
    {id: 14, value: "GNU radio ML dataset RML2016.10a"},
    {id: 15, value: "Google"},
    {id: 16, value: "GTSRB"},
    {id: 17, value: "HMDB-51"},
    {id: 18, value: "IMDB"},
    {id: 19, value: "ILSVRC"},
    {id: 20, value: "IEEE"},
    {id: 21, value: "ImageNet"},
    {id: 22, value: "Kaggle"},
    {id: 23, value: "Kinetics-400"}
  ] }
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
