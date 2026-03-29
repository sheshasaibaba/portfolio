import type { Project } from "@/types/portfolio";

const COLAB =
  "https://colab.research.google.com/drive/1KndJrXtcPvRe8Eh0TLhnswuH50WtYGsd?usp=sharing";

export const visionAIProject: Project = {
  id: "vision-outfit-ai",
  slug: "vision-outfit-ai",
  title: "Neural-Vision Outfit Recommender",
  technicalHighlight:
    "Ensemble CV + Flask API — cosine NN retrieval with demographic-aware search pruning.",
  description:
    "A high-precision image recommendation engine that uses a multi-model ensemble for visual similarity, demographic markers, and occasion context.",
  tags: ["Python", "PyTorch", "Flask", "OpenCV", "ONNX", "InsightFace", "Scikit-learn"],
  href: COLAB,
  hrefLabel: "Colab",
  image: "/projects/vision-outfit-ai.svg",
  details:
    "Flask REST API, ONNX runtime, cosine NN retrieval with demographic pruning — sub-2s end-to-end.",
  narrative: {
    mission:
      "Deliver outfit recommendations that go beyond pixel matching by combining ensemble computer vision, demographic-aware filtering, and fast cosine-similarity retrieval.",
    innovation:
      "Confidence-weighted consensus across InsightFace, DeepFace, and a custom FairFace-style ResNet34: when the custom head exceeds a high confidence threshold its vote wins; otherwise a majority vote sets demographic filters before nearest-neighbor search.",
    technicalDeepDive: [
      "Architecture: ensemble of InsightFace, DeepFace, and a transfer-learned ResNet34 (FairFace-style) with dual classification heads for robust attribute extraction.",
      "Consensus logic: prioritize ResNet34 when confidence > ~95%; else blend InsightFace 512D embeddings with DeepFace attribute signals via majority vote.",
      "Retrieval: nearest neighbors with cosine similarity; search space pruned using predicted demographics and occasion metadata before similarity for relevance and speed.",
      "Deployment: Flask REST API — raw image upload, GPU ONNX inference, Base64-encoded recommendation payloads for frontend integration.",
    ],
  },
};
