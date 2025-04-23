export interface Option{
  id:number;
  value:string
}

export interface OptionQ{
  [x: string]: any;
  id:number;
  value:Option[]; 
}

export interface QuestionStorage{
  id: string;
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
  {id: 2, value:[
    {id: 1, value:"Very Easy"},
    {id: 2, value:"Easy"},
    {id: 3, value:"Medium"},
    {id: 4, value:"Hard"},
    {id: 5, value:"Very Hard"},
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
    {id: 5, value: "No retraining"}
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
  { id: 18, value: [
  { id: 1, value: "aishell-1" },
  { id: 2, value: "AlphaGo Zero" },
  { id: 3, value: "Amazon" },
  { id: 4, value: "Baidu Apollo real-world LiDAR data" },
  { id: 5, value: "Bird&Bicycle" },
  { id: 6, value: "CASIA-WebFace" },
  { id: 7, value: "CIFAR" },
  { id: 8, value: "COCO" },
  { id: 9, value: "CSTR VCTK Corpus" },
  { id: 10, value: "Chest X-Ray" },
  { id: 11, value: "Dermofit" },
  { id: 12, value: "Dermoscopy" },
  { id: 13, value: "Fundoscopy" },
  { id: 14, value: "GNU radio ML dataset RML2016.10a" },
  { id: 15, value: "Google" },
  { id: 16, value: "GTSRB" },
  { id: 17, value: "HMDB-51" },
  { id: 18, value: "IMDB" },
  { id: 19, value: "ILSVRC" },
  { id: 20, value: "IEEE" },
  { id: 21, value: "ImageNet" },
  { id: 22, value: "Kaggle" },
  { id: 23, value: "Kinetics-400" },
  { id: 24, value: "LFW" },
  { id: 25, value: "LISA" },
  { id: 26, value: "Libri" },
  { id: 27, value: "LOBSTER centisecond-resolution data" },
  { id: 28, value: "METR-LA" },
  { id: 29, value: "MNIST" },
  { id: 30, value: "MS-COCO" },
  { id: 31, value: "MR" },
  { id: 32, value: "MultiMNIST" },
  { id: 33, value: "NoGo" },
  { id: 34, value: "NSL-KDD" },
  { id: 35, value: "OASIS" },
  { id: 36, value: "PEMS-BAY" },
  { id: 37, value: "PIPA" },
  { id: 38, value: "Places365" },
  { id: 39, value: "Power system" },
  { id: 40, value: "RML" },
  { id: 41, value: "Spoken commands" },
  { id: 42, value: "T1w 3D MRI images" },
  { id: 43, value: "TALFW" },
  { id: 44, value: "Tiny-Imagenet" },
  { id: 45, value: "UCF-101" },
  { id: 46, value: "VoxCeleb1" },
  { id: 47, value: "WSJ" },
  { id: 48, value: "YOHO" }
  ] },
  { id: 19, value:[
    {id: 1, value:"Very Easy"},
    {id: 2, value:"Easy"},
    {id: 3, value:"Medium"},
    {id: 4, value:"Hard"},
    {id: 5, value:"Very Hard"},
    {id:6, value: "Not Possible"}
  ], },
  { id: 20, value:[
    { id: 1, value: "12-layer convnet" },
    { id: 2, value: "Alexnet" },
    { id: 3, value: "AllConv" },
    { id: 4, value: "Amazon" },
    { id: 5, value: "ASR systems" },
    { id: 6, value: "Att2in" },
    { id: 7, value: "Baidu Apollo" },
    { id: 8, value: "BLE IoT devices" },
    { id: 9, value: "Bottom-up Top-down" },
    { id: 10, value: "CIFAR" },
    { id: 11, value: "CNN" },
    { id: 12, value: "Commercial APIs" },
    { id: 13, value: "Context-aware model" },
    { id: 14, value: "DenseNet" },
    { id: 15, value: "DNN" },
    { id: 16, value: "DT" },
    { id: 17, value: "End-to-end deep neural network" },
    { id: 18, value: "Facebook fastText" },
    { id: 19, value: "GMM-UBM" },
    { id: 20, value: "GooglLeNet" },
    { id: 21, value: "Google" },
    { id: 22, value: "GraphWaveNet" },
    { id: 23, value: "Hash" },
    { id: 24, value: "IBM" },
    { id: 25, value: "I3D" },
    { id: 26, value: "ImageNet" },
    { id: 27, value: "Inc" },
    { id: 28, value: "Inception" },
    { id: 29, value: "J48" },
    { id: 30, value: "Kaldi" },
    { id: 31, value: "KNN" },
    { id: 32, value: "LeNet" },
    { id: 33, value: "Linear classifiers" },
    { id: 34, value: "Lingvo" },
    { id: 35, value: "LR" },
    { id: 36, value: "LSTM" },
    { id: 37, value: "MCTS" },
    { id: 38, value: "MFCC" },
    { id: 39, value: "Microsoft Azure" },
    { id: 40, value: "Microsoft Cortana" },
    { id: 41, value: "MLP" },
    { id: 42, value: "MobileFaceNet" },
    { id: 43, value: "MobileNet" },
    { id: 44, value: "MNIST" },
    { id: 45, value: "NB" },
    { id: 46, value: "nasnet" },
    { id: 47, value: "NiN" },
    { id: 48, value: "NTIMIT" },
    { id: 49, value: "PDQ" },
    { id: 50, value: "PLDA" },
    { id: 51, value: "Policy-Value neural network (PV-NN)" },
    { id: 52, value: "Random Forest" },
    { id: 53, value: "ResNet" },
    { id: 54, value: "RF" },
    { id: 55, value: "ROBERTa" },
    { id: 56, value: "RNN-ADV" },
    { id: 57, value: "SegNet" },
    { id: 58, value: "SqueezeNet" },
    { id: 59, value: "SVM" },
    { id: 60, value: "Talentedsoft" },
    { id: 61, value: "UNet" },
    { id: 62, value: "VGG" },
    { id: 63, value: "vit" },
    { id: 64, value: "WRN" },
    { id: 65, value: "X-vector" },
    { id: 66, value: "YOLO" },
  ], }
  ]
  




export const questionsStorage: QuestionStorage[] = [


  { id: "T1",domain:'Impact', question: "Specific Input Manipulation (T1): How severe would the impact be if an attacker caused the model to provide incorrect outputs for specific inputs they selected?",example:" Example: A fraud detection model incorrectly approves transactions flagged by the attacker",optId:1 },
  { id: "T2",domain:'Impact', question: "Backdoor Exploitation (T2): How severe would the impact be if a pre-defined trigger in the inputs caused the model to produce incorrect outputs?",example:" Example: A specific phrase in a document bypasses a text moderation model.",optId:1 },
  { id: "T3",domain:'Impact', question: "Targeted Attack (T3): How severe would the impact be if an attacker altered the system's behavior to produce incorrect outputs for a specific subset of inputs based on their inherent characteristics?",example:"Example: An attacker manipulates a financial model so that transactions from a specific region are consistently flagged as high-risk, regardless of their actual attributes, influencing decisions for this subset without relying on explicit triggers",optId:1 },
  { id: "T4",domain:'Impact', question: "Training Data Membership Inference (T4): How severe would the impact be if an attacker could identify whether specific data samples were used in training? (know which instances were included in the training set)",example: " Example: A malicious actor determines a user's medical record was part of a training dataset",optId:1 },
  { id: "T5",domain:'Impact', question: "Training Data Property Inference (T5): How severe would the impact be if an attacker inferred general properties of the training data (e.g., feature distributions, input types)? ",example:"Example: An attacker deduces the demographic makeup of a training dataset.",optId:1 },
  { id: "T6",domain:'Impact', question: "Training Data Exposure (T6): How severe would the impact be if an attacker leaked some or all of the training data?",example:"Example: Customer data used for training a recommendation system is exposed.",optId:1 },
  { id: "T7",domain:'Impact', question: "Model Replication (T7): How severe would the impact be if an attacker extracted enough information to replicate your model? ",example:"Example: An attacker uses API queries to recreate a model for commercial gain.",optId:1 },
  { id: "T8",domain:'Impact', question: "esource Exhaustion - Global (T8): How severe would the impact be if an attacker caused the ML model to use excessive resources (e.g., energy, time) for all inputs at inference time? ",example:" Example: The system's response times slow down across all operations",optId:1},
  { id: "T9",domain:'Impact', question: "Resource Exhaustion - Specific Inputs (T9): How severe would the impact be if an attacker caused the ML model to use excessive resources for specific inputs at inference time?",example:"Example: When processing certain inputs, the system experiences disproportionate delays, with higher-than-usual energy or computational requirements, while other inputs are processed normally.",optId:1},
  { id: "T10",domain:'Impact', question: "Resource Exhaustion -  Resource Exhaustion - Training Phase (T10): How severe would the impact be if an attacker caused the training process to use excessive resources (e.g., energy consumption, time, etc.)?",example:" Example: The training process becomes inefficient, taking longer and consuming more computational resources than expected.",optId:1 },
  { id: "T11",domain:'Impact', question: "Global Output Corruption (T2): How severe would the impact be if an attacker caused the model to produce wrong outputs for every input?",example:"Example: A recommendation system consistently suggests irrelevant or harmful content.",optId:1},


  { id: "1",domain:'Capabilty', question: "How easy is it for the threat actor to compromise the data used for training or re-training the model?",example:" ",optId:2},
  { id: "3",domain:'Capabilty', question: " How easy is it for the threat actor to compromise the labeling procedure (i.e., causing incorrect labels to be included in the training set)?",example:" ",optId:2},
  { id: "4",domain:'Capabilty', question: " Do you perform any type of manual feature engineering?",example:"Feature Engineering",optId:3},
  { id: "5",domain:'Capabilty', question: " What level of Training data validation (e.g., cleaning, filtering, OOD/anomaly detection) is performed?", example:"Performing Training-Data validation",optId:4},
  { id: "6",domain:'Capabilty', question: "What level of data validation (e.g., cleaning, filtering, OOD/anomaly detection) is performed? (At inferance - when the system is already deployed)",example:"Performing Training-Data validation",optId:4},
  { id: "7",domain:'Capabilty', question: "How secure are your model's parameters against unauthorized changes? (e.g., sending malicious updates)",example:"Manipulating the Model's parameters",optId:5},
  { id: "8",domain:'Capabilty', question: " How often do you retrain the model?",example:"Model retraining frequency",optId:6 },
  { id: "9",domain:'Capabilty', question: "What feedback is accessible to the threat actor during the model's training process? (Feedback refers to any information the threat actor could potentially access about the model's behavior or decisions during training.)",example:"Example: Model feadback training.",optId:7 },
  { id: "10",domain:'Capabilty', question: " When retraining the model, do you retrain it from scratch or do you perform fine-tuning or transfer learning?",example:"Example: End2End/Transfer learning",optId:8 },
  { id: "11",domain:'Capabilty', question: " Do you conduct online evaluation of your models? Does this include A/B testing?",example:"Model Online Evaluation.",optId:9},
  { id: "12",domain:'Capabilty', question: "How easy is it for the threat actor to manipulate the model's inputs digitally at serving time? (e.g., via an accessible API)",example:"Trigger the attack digital",optId:19},
  { id: "13",domain:'Capabilty', question: " How easy is it for the threat actor to manipulate the model's inputs physically at serving time? (e.g., placing an adversarial object in front of a sensor)",example:"Manipulating the environment (Trigger the Attack Physical",optId:19},
  { id: "14",domain:'Capabilty', question: "What is the feedback provided to model's users during serving time?",example:" Model feadbck serving",optId:7 },
  { id: "15",domain:'Capabilty', question: " How easy is it for the threat actor to obtain training data samples used for training the model?",example:" KNOWLADGE: Training Data",optId:19},
  { id: "16",domain:'Capabilty', question: "How easy is it for the threat actor to obtain training data samples used for training the model, or reference data which is similar to the data used for training the model?",example:"Knowledge: Surrogate/Training Data Access",optId:19 },
  { id: "17",domain:'Capabilty', question: "How much information does the threat actor have about the model's design, training process, or deployment setup?",example:" KNOWLEDGE: Model Data",optId:11 },
  { id: "18",domain:'Capabilty', question: " How easy is it for the threat actor to access system metrics IN TRAINING TIME? (e.g., time, energy consumption, CPU)",example:" Access to systems' metrics - Training.",optId:19},
  { id: "19",domain:'Capabilty', question: "How easy is it for the threat actor to access system metrics IN SERVING TIME? (e.g., time, energy consumption, CPU)",example:"Access to systems' metrics - SERVING:",optId:19 },
 



  { id: "20",domain:'Model Type & Risk', question: "What type of model do you use in the selected use case? (Choose the option that best describes your model's architecture or technique.)",example:" Model Type",optId:12 },
  { id: "21",domain:'Model Type & Risk', question: "What type of task is your model solving?\n(Indicates the primary task the model is designed for.)",example:"Task Type.",optId:13 },
  { id: "22",domain:'Model Type & Risk', question: "What type of data is your model using? (Select the type of data processed by the model.)",example:" A specific phrase in a document bypasses a text moderation model.",optId:14 },
  { id: "23",domain:'Model Type & Risk', question: "What is the domain of your use case?\n(Identify the application area your model is serving.)", example:"Usecase Domain.",optId:15 },
  {id:"M1", domain:'Model Type & Risk', question:" Do you use known datasets to train your model? (Select all that apply.) for your convinience - the options are categorized by domains",example:'Datasets (multi-choise)',optId:18},
  {id: "M2",domain:'Model Type & Risk', question: 'Do you use known model architectures in your system? (Select all that apply.)', example:"Architectures (multi-choice)",optId:20}
];
