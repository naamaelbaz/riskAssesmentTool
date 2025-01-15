const step1Schema = {
    title: "T1: Specific Input Manipulation",
    type: "object",
    properties: {
      impactSeverity: {
        type: "string",
        title: "How severe would the impact be if an attacker caused the model to provide incorrect outputs for specific inputs they selected?",
        enum: [
          "Very High",
          "High",
          "Medium Impact",
          "Low",
          "Very Low"
        ],
        enumNames: [
          "Very High",
          "High",
          "Medium Impact",
          "Low",
          "Very Low"
        ],
        default: "Medium Impact"
      },
      instanceSpecificIncorrectOutput: {
        type: "string",
        title: "T1-I (Instance-Specific Incorrect Output): The model is manipulated to produce wrong outputs for particular inputs chosen/perturbated by the attacker (for example, using adversarial examples).",
        enum: [
          "Yes",
          "No"
        ],
        enumNames: [
          "Yes",
          "No"
        ],
        default: "No"
      }
    },
    required: ["impactSeverity", "instanceSpecificIncorrectOutput"]
  };
  