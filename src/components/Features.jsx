import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Yoga and Meditation relevant images (yoga poses and meditation)
const meditationImages = [
  {
    src: "data:image/jpeg;base64,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",
    alt: "Meditation in Nature",
    label: "Meditation in Nature",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsif-kUiTMwgq1uk6AOIO6PKunytka74jOcA&s",
    alt: "Tree Pose (Vrikshasana)",
    label: "Tree Pose (Vrikshasana)",
  },
  {
    src: "data:image/jpeg;base64,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",
    alt: "Child's Pose (Balasana)",
    label: "Child's Pose (Balasana)",
  },
  {
    src: "data:image/jpeg;base64,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",
    alt: "Lotus Pose (Padmasana)",
    label: "Lotus Pose (Padmasana)",
  },
  {
    src: "data:image/jpeg;base64,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",
    alt: "Seated Meditation",
    label: "Seated Meditation",
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAAPn4AACCKCgwGg4FQQgICgQCBCBAwGBoEAgEBAoIDAoIEBAgQCAoDAgQEBgQDAgMCBwMCBgMCBAQHDAQFBgcIDA4HDBMKEhMUFhkcHR8gISMlJicoKSorLS4vMzQ1Njc4OTo7PD0+P0JFVldfWGpzdneBiI+QkpaXmJmanp+goqSmp6iprK2ur7CwsrO0tba3uLm6u7y9vr+wsbO0tba3uLm6u7y9vr/AAsbGz9DR0tPU1dbX2NnZ2drb3d/e4OLl5ebn6Ojp6err7e3v8PHy8/T19fb3+Pn5+fr6+/v8/P39/f7+/v/AARJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSWc/tP6f6ZtP8A/wK8pXpGz/7vjP1U//J/0o870z81k9J80+N7/AAxS/sJkY38fX/Vn/xK4eP/ACd2j3p3+t/F8/6f0x5d0Q/F2l+bI/hPT19d/q1WPH4fVl/F+L/AF/1yP90S8b2m/d8Y/wA/4xS/3j5/t1v8A7Z/X+v/F0eXl9O/zX7uF/F/1tH7c/8Acz/0f+zG9L/pXG/rn/xJnX+Xk9Z/w9Ff7s/93P8A7P8A/hA9x07+hR9P6f+xMf92X4P+n/AGV/8j8/7I/8oQf/AD2n/wA2R/4r/w3/AO/5+h//xAAdAQACAgMBAQEAAAAAAAAAAAAABQQGAgMHAQgJ/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAy/E5/c2P/2Q==",
    alt: "Downward Dog (Adho Mukha Svanasana)",
    label: "Downward Dog (Adho Mukha Svanasana)",
  },
  {
    

    src: "https://static.vikaspedia.in/mediastorage/image/Vrikshasana_(Tree_posture).png",
    alt: "Mountain Pose (Tadasana)",
    label: "Mountain Pose (Tadasana)",
  },
];

const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Features = () => {
  // State for PDF/article viewing
  const [selected, setSelected] = useState(null);
  const [pdfToView, setPdfToView] = useState(null);
  const [pdfMeta, setPdfMeta] = useState(null);

  // **********************************************
  // SCROLL TRIGGER ANIMATION ADDITIONS
  // 1. Ref for the element to observe
  const headerRef = useRef(null);
  // 2. State for the animation controls (to be used in a real environment with a scroll library)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mock Scroll/Intersection Observer logic for a conceptual implementation
  // In a real environment, you would use GSAP ScrollTrigger or a dedicated hook
  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set a mock progress based on intersection ratio
        setScrollProgress(entry.intersectionRatio);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: Array.from({ length: 20 }, (_, i) => i * 0.05), // Check every 5%
      }
    );

    observer.observe(headerRef.current);

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);
  // **********************************************

  const data = useMemo(
    () => ({
      sections: [
        {
          id: "pdf-1",
          title: "Yoga & Meditation Information",
          description:
            "Explore trusted online resources about yoga postures, meditation techniques, and their benefits. Click to visit the official sites for more information.",
          icon: "📄",
          color: "cyan",
          type: "pdfs",
          items: [
            {
              id: "yoga-101",
              title: "Yoga Basics: Poses, Types, History & Benefits (Yoga Journal)",
              format: "Link",
              url: "https://www.yogajournal.com/yoga-101/",
              readUrl: "https://www.yogajournal.com/yoga-101/",
              description: "Comprehensive guide to yoga basics, including foundational poses, types of yoga, and health benefits.",
              source: "Yoga Journal"
            },
            {
              id: "yoga-102",
              title: "Beginner Yoga Poses (Verywell Fit)",
              format: "Link",
              url: "https://www.verywellfit.com/beginner-yoga-poses-3566747",
              readUrl: "https://www.verywellfit.com/beginner-yoga-poses-3566747",
              description: "A list of beginner-friendly yoga poses with step-by-step instructions and images.",
              source: "Verywell Fit"
            },
            {
              id: "yoga-103",
              title: "Meditation: A Simple, Fast Way to Reduce Stress (Mayo Clinic)",
              format: "Link",
              url: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858",
              readUrl: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858",
              description: "Learn about meditation techniques, benefits, and how to get started.",
              source: "Mayo Clinic"
            },
            {
              id: "yoga-104",
              title: "Yoga for Mental Health (Harvard Health Publishing)",
              format: "Link",
              url: "https://www.health.harvard.edu/mind-and-mood/yoga-for-better-mental-health",
              readUrl: "https://www.health.harvard.edu/mind-and-mood/yoga-for-better-mental-health",
              description: "How yoga can help improve mental health and emotional well-being.",
              source: "Harvard Health Publishing"
            },
            {
              id: "yoga-105",
              title: "Meditation for Beginners (Headspace)",
              format: "Link",
              url: "https://www.headspace.com/meditation/meditation-for-beginners",
              readUrl: "https://www.headspace.com/meditation/meditation-for-beginners",
              description: "A beginner's guide to meditation, including tips and guided sessions.",
              source: "Headspace"
            },
          ],
          actions: [
            { label: "Browse Resources", type: "primary", action: "open_section" },
          ],
        },
        {
          id: "vid-1",
          title: "Video Resources",
          description:
            "Short videos covering anxiety, depression, and core coping skills with practical demonstrations.",
          icon: "🎥",
          color: "purple",
          type: "videos",
          items: [
            {
              id: "v-101",
              title: "Understanding Anxiety (Explainer)",
              duration: "9:45",
              level: "Beginner",
              url: "https://www.youtube.com/embed/WWloIAQpMcQ",
            },
            {
              id: "v-102",
              title: "Grounding For Panic",
              duration: "7:10",
              level: "Beginner",
              url: "https://www.youtube.com/embed/9rLZYyMbJic",
            },
            {
              id: "v-103",
              title: "CBT: Catch, Check, Change",
              duration: "11:05",
              level: "Intermediate",
              url: "https://www.youtube.com/embed/9c_Bv_FBE-c",
            },
            {
              id: "v-104",
              title: "Stress vs. Burnout",
              duration: "8:02",
              level: "Beginner",
              url: "https://www.youtube.com/embed/4NQreLs8QpA",
            },
            {
              id: "v-105",
              title: "Progressive Muscle Relaxation (Guided)",
              duration: "12:00",
              level: "Relaxation",
              url: "https://www.youtube.com/embed/1nZEdqcGVzo",
              afterRelax: true,
            },
            {
              id: "v-106",
              title: "Guided Mindfulness Meditation for Calm",
              duration: "10:00",
              level: "Relaxation",
              url: "https://www.youtube.com/embed/inpok4MKVLM",
              afterRelax: true,
            },
            {
              id: "v-107",
              title: "Deep Breathing for Stress Relief",
              duration: "6:00",
              level: "Relaxation",
              url: "https://www.youtube.com/embed/odADwWzHR24",
              afterRelax: true,
            },
            {
              id: "v-108",
              title: "Managing Depression: Practical Steps",
              duration: "10:30",
              level: "Intermediate",
              url: "https://www.youtube.com/embed/1Evwgu369Jw",
            },
            {
              id: "v-109",
              title: "Coping with Social Anxiety",
              duration: "8:50",
              level: "Beginner",
              url: "https://www.youtube.com/embed/3QwvJWjAt6A",
            },
          ],
          actions: [
            { label: "Watch Videos", type: "primary", action: "open_section" },
            {
              label: "Video Library",
              type: "secondary",
              action: "open_section",
            },
          ],
        },
        {
          id: "med-1",
          title: "Basic Meditation & Yoga Poses",
          description:
            "Beginner-friendly yoga postures and meditation exercises to reduce stress and increase focus.",
          icon: "🧘",
          color: "green",
          type: "meditation",
          items: [
            {
              id: "m-201",
              title: "Yoga Strech for Anxiety",
              duration: "14:44",
              
            },
            {
              id: "m-202",
              title: "Focus Meditation",
              duration: "10:55",
              
            },
            {
              id: "m-203",
              title: "30 min deep Meditation",
              duration: "9:00",
              
            },
            {
              id: "m-204",
              title: "Relaxing full body yoga",
              duration: "11:00",
              
            },
            {
              id: "m-205",
              title: "SKapalbharti and Yogic Breathing",
              duration: "12:40",
              
            },
            {
              id: "m-206",
              title: "Pranayam",
              duration: "9:30",
              
            },
            {
              id: "m-207",
              title: "Simple Meditation",
              duration: "8:40",
              
            },
            {
              id: "m-208",
              title: "Master Your Breath",
              duration: "7:07",
              
            },
          ],
          actions: [
            {
              label: "Start Practice",
              type: "primary",
              action: "open_section",
            },
            { label: "View All", type: "secondary", action: "open_section" },
          ],
        },
        {
          id: "aud-1",
          title: "Audio Resources",
          description:
            "Listen to calming tracks, guided relaxations, and short talks on mental wellness.",
          icon: "🎧",
          color: "blue",
          type: "audio",
          items: [
            {
              id: "a-201",
              title: "Relaxed Breathing Loop",
              duration: "6:00",
              url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            },
            {
              id: "a-202",
              title: "Progressive Muscle Relaxation",
              duration: "12:15",
              url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            },
            {
              id: "a-203",
              title: "Wind-Down for Sleep",
              duration: "10:40",
              url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            },
            {
              id: "a-204",
              title: "Morning Focus Tone",
              duration: "7:05",
              url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            },
          ],
          actions: [
            { label: "Listen Now", type: "primary", action: "open_section" },
            { label: "All Audio", type: "secondary", action: "open_section" },
          ],
        },
      ],
    }),
    []
  );

  const openSection = (section) => setSelected(section);
  const closeModal = () => {
    setSelected(null);
    setPdfToView(null);
    setPdfMeta(null);
  };

  // **********************************************
  // SCROLL TRIGGER ANIMATION VARIANTS
  const headerVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(5px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animate property based on scrollProgress (conceptual)
  const animatedHeader = {
    scale: 0.8 + scrollProgress * 0.2, // Scales from 0.8 to 1.0
    opacity: scrollProgress, // Fades in from 0 to 1
    filter: `blur(${5 * (1 - scrollProgress)}px)`, // Blurs out as it scrolls away
    // We will use the `initial` and `whileInView` props on `motion.h1` below
  };
  // **********************************************

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute h-[96vh] w-[96vw] rr bc rrCenter flex flex-col justify-center items-center overflow-y-hidden">
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
          {/* Header - Compact */}
          <header className="text-center mb-6 flex-shrink-0" ref={headerRef}>
            {/* **********************************************
            UPDATED H1 WITH MOTION AND VARIANTS
            ********************************************** */}
            <motion.h1
              className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }} // Triggers when 80% of element is visible
              variants={headerVariants}
            >
              Mental Health Resources
            </motion.h1>
            <p className="text-sm text-gray-300 max-w-xl mx-auto">
              Explore yoga, meditation, videos, and audio resources.
            </p>
          </header>

          {/* 2x2 grid - Compact to fit without scrolling */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-4xl flex-1 max-h-[70vh] overflow-y-auto">
            {data.sections.map((s) => (
              <ResourceCard
                key={s.id}
                section={s}
                onOpen={() => openSection(s)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <SectionModal
          section={selected}
          onClose={closeModal}
          onPdfRead={(pdfUrl, meta) => {
            setPdfToView(pdfUrl);
            setPdfMeta(meta || null);
          }}
        />
      )}

      {/* PDF Viewer Modal */}
      {pdfToView && (
        <PdfViewerModal
          pdfUrl={pdfToView}
          onClose={() => {
            setPdfToView(null);
            setPdfMeta(null);
          }}
          meta={pdfMeta}
        />
      )}
    </div>
  );
};

const palette = {
  purple: { bar: "from-purple-500 to-purple-700", ring: "ring-purple-400/40" },
  green: { bar: "from-emerald-500 to-teal-600", ring: "ring-emerald-400/40" },
  blue: { bar: "from-blue-500 to-cyan-500", ring: "ring-blue-400/40" },
  cyan: { bar: "from-cyan-500 to-teal-600", ring: "ring-cyan-400/40" },
};

const ResourceCard = ({ section, onOpen }) => {
  const { title, description, icon, color, items, actions } = section;
  const c = palette[color] || palette.purple;

  return (
    <motion.div
      className={cn(
        "w-full rounded-md overflow-hidden",
        "border-transparent",
        "p-2",
        "relative group z-10 h-full"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Layer 1: The Glass Effect Background */}
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-sm
            shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]
        transition-all
        dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)] border-4 border-white/40"
      />

      {/* Layer 2: Backdrop Filter */}
      <div className="absolute top-0 left-0 isolate -z-10 h-full w-full rounded-md overflow-hidden" />

      {/* Layer 3: The Diagonal Lines Pattern and Gradient */}
      <div
        className={cn(
          "absolute inset-0 z-5 w-full h-full bg-repeat",
          "bg-[length:30px_30px]",
          "bg-lines-pattern-light dark:bg-lines-pattern"
        )}
      >
        <div
          className={cn(
            "w-full h-full bg-gradient-to-tr",
            "from-white/5 via-white/0 to-white/0",
            "dark:from-black/10 dark:via-black/0 dark:to-black/0"
          )}
        />
      </div>

      {/* Layer 4: Text Background for Readability */}
      <div className="absolute inset-0 z-10 bg-black/5 rounded-md backdrop-blur-[0px]" />

      {/* Layer 5: Actual Card Content */}
      <div className="relative z-20 p-3 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${c.bar}`} />
          <span className="text-lg">{icon}</span>
        </div>

        <h2 className="text-base font-semibold mb-2 text-white">{title}</h2>
        <p className="text-gray-300 mb-3 text-xs leading-tight flex-grow">
          {description}
        </p>

        {items?.length > 0 && (
          <ul className="space-y-0.5 mb-3">
            {items.slice(0, 2).map((it) => (
              <li
                key={it.id}
                className="text-xs text-gray-400 flex items-center"
              >
                <span className="text-indigo-400 mr-1.5">•</span>
                <span className="truncate">{it.title}</span>
              </li>
            ))}
            {items.length > 2 && (
              <li className="text-xs text-gray-500 italic flex items-center">
                <span className="text-indigo-400 mr-1.5">•</span>+
                {items.length - 2} more
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto">
          {actions?.slice(0, 1).map((a, i) => (
            <Btn
              key={i}
              kind={a.type}
              onClick={onOpen}
              ring={c.ring}
              className="text-xs py-1.5 px-3 w-full"
            >
              {a.label}
            </Btn>
          ))}
        </div>
      </div>

      {/* SVG Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter
            id="liquid-glass-filter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.05"
              numOctaves="1"
              seed="1"
              result="turbulence"
            />
            <feGaussianBlur
              in="turbulence"
              stdDeviation="2"
              result="blurredNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurredNoise"
              scale="70"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation="4"
              result="finalBlur"
            />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};

const Btn = ({ kind = "primary", onClick, children, className = "", ring }) => {
  const base =
    "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 " +
    (ring || "ring-indigo-400/40");
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-400 to-purple-500 text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[kind]} ${className}`}
    >
      {children}
    </button>
  );
};

// AudioPlayer component for playing audio
const AudioPlayer = ({ url, isPlaying, onPlay, onPause }) => {
  const audioRef = useRef(null);

  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, url]);

  return (
    <audio
      ref={audioRef}
      src={url}
      onEnded={onPause}
      style={{ display: "none" }}
    />
  );
};

// VideoPlayer: Remove autoPlay, always show with autoPlay=false
const VideoPlayer = ({ url, onEnded }) => (
  <div className="w-full aspect-video rounded-lg overflow-hidden bg-black mb-2">
    <iframe
      src={url + "?rel=0"}
      title="Video Resource"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
      frameBorder="0"
      onEnded={onEnded}
    />
  </div>
);

// PDF Viewer Modal (in-app) - now with professional preview
const PdfViewerModal = ({ pdfUrl, onClose, meta }) => {
  // For links, just open in new tab, but keep modal for consistency
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-4">
      <motion.div
        className="max-w-3xl w-full h-[60vh] bg-white rounded-lg overflow-hidden relative flex flex-col shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Professional Article Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📄</span>
            <div>
              <div className="text-lg font-bold text-white">
                {meta?.title || "Resource Preview"}
              </div>
              {meta?.source && (
                <div className="text-xs text-indigo-100 font-medium mt-0.5">
                  {meta.source}
                </div>
              )}
            </div>
          </div>
          <button
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            onClick={onClose}
            title="Close"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>
        {/* Article Description */}
        {meta?.description && (
          <div className="px-4 py-2 bg-indigo-50 border-b border-indigo-100 text-gray-700 text-sm">
            {meta.description}
          </div>
        )}
        {/* Resource Link Preview */}
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline text-lg font-semibold"
            style={{ wordBreak: "break-all" }}
          >
            Open Resource in New Tab
          </a>
        </div>
        {/* Download and Open in New Tab */}
        <div className="flex items-center justify-end gap-2 p-3 bg-gray-50 border-t border-gray-200">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition text-sm font-medium"
            style={{ minWidth: 100, textAlign: "center" }}
            title="Open in new tab"
          >
            Open in New Tab
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const SectionModal = ({ section, onClose, onPdfRead }) => {
  // For audio playback state
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // For video playback state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handlePlayAudio = (audioId) => {
    setPlayingAudioId(audioId);
  };

  const handlePauseAudio = () => {
    setPlayingAudioId(null);
  };

  // For video auto-play after relaxation
  const getMainVideos = () =>
    section.items.filter((v) => !v.afterRelax);
  const getRelaxVideos = () =>
    section.items.filter((v) => v.afterRelax);

  const wrap = (children) => (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "max-w-4xl w-full max-h-[80vh] rounded-md overflow-hidden",
          "border-transparent",
          "p-3",
          "relative group z-10"
        )}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Layer 1: The Glass Effect Background */}
        <div
          className="absolute top-0 left-0 z-0 h-full w-full rounded-sm
              shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]
          transition-all
          dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)] border-4 border-white/40"
        />

        {/* Layer 2: Backdrop Filter */}
        <div className="absolute top-0 left-0 isolate -z-10 h-full w-full rounded-md overflow-hidden" />

        {/* Layer 3: The Diagonal Lines Pattern and Gradient */}
        <div
          className={cn(
            "absolute inset-0 z-[1] w-full h-full bg-repeat",
            "bg-[length:30px_30px]",
            "bg-lines-pattern-light dark:bg-lines-pattern"
          )}
        >
          <div
            className={cn(
              "w-full h-full bg-gradient-to-tr",
              "from-white/5 via-white/0 to-white/0",
              "dark:from-black/10 dark:via-black/0 dark:to-black/0"
            )}
          />
        </div>

        {/* Layer 4: Text Background for Readability */}
        <div className="absolute inset-0 z-[2] bg-black/20 rounded-md backdrop-blur-[0px]" />

        {/* Layer 5: Actual Modal Content */}
        <div className="relative z-50 h-full flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-white/20 flex-shrink-0">
            <h2 className="text-2xl font-semibold text-white relative z-50">
              {section.title}
            </h2>
            <button
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors relative z-50"
              onClick={onClose}
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto relative z-50">{children}</div>
        </div>

        {/* SVG Filter Definition */}
        <svg className="hidden">
          <defs>
            <filter
              id="modal-liquid-glass-filter"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05 0.05"
                numOctaves="1"
                seed="2"
                result="turbulence"
              />
              <feGaussianBlur
                in="turbulence"
                stdDeviation="2"
                result="blurredNoise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurredNoise"
                scale="70"
                xChannelSelector="R"
                yChannelSelector="B"
                result="displaced"
              />
              <feGaussianBlur
                in="displaced"
                stdDeviation="4"
                result="finalBlur"
              />
              <feComposite in="finalBlur" in2="finalBlur" operator="over" />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </div>
  );

  if (section.type === "pdfs") {
    return wrap(
      <div className="space-y-3 relative z-[100] max-h-[60vh] overflow-y-auto pr-2">
        {section.items.map((f) => (
          <div
            key={f.id}
            className="flex items-center gap-4 bg-white/20 rounded-lg p-4 hover:bg-white/25 transition relative z-[100] text-white border border-white/10"
            style={{ position: 'relative', zIndex: 100 }}
          >
            <span className="text-2xl relative z-[100]">📄</span>
            <span className="flex-grow text-white font-medium relative z-[100]">{f.title}</span>
            <div className="flex gap-2 relative z-[100]">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
                style={{ minWidth: 80, textAlign: "center" }}
                title="Open Resource"
                onClick={e => {
                  e.preventDefault();
                  if (onPdfRead) onPdfRead(f.readUrl, {
                    title: f.title,
                    description: f.description,
                    source: f.source,
                  });
                }}
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "videos") {
    // Professional video modal: user selects video from the list
    const allVideos = section.items;

    // If there are no videos, fallback
    if (allVideos.length === 0) {
      return wrap(<div className="text-white">No videos available.</div>);
    }

    // Current video object
    const currentVideo = allVideos[currentVideoIndex];

    return wrap(
      <div className="relative z-[100] flex flex-col items-center w-full max-h-[60vh] overflow-y-auto pr-2">
        <div className="w-full max-w-2xl mx-auto">
          {/* VideoPlayer with autoPlay removed */}
          <VideoPlayer
            url={currentVideo.url}
          />
          <div className="text-white font-semibold text-lg mb-1 text-center">
            {currentVideo.title}
          </div>
          <div className="text-gray-300 text-sm mb-4 text-center">
            {currentVideo.duration} • {currentVideo.level}
          </div>
        </div>
        <div className="mt-8 w-full">
          <div className="text-white font-semibold mb-2 text-center">Select a Video</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allVideos.map((v, idx) => (
              <div
                key={v.id}
                className={cn(
                  "bg-white/20 rounded-lg p-4 text-center hover:bg-white/25 transition cursor-pointer border border-white/10",
                  idx === currentVideoIndex ? "ring-2 ring-indigo-400" : ""
                )}
                onClick={() => setCurrentVideoIndex(idx)}
                style={{ position: 'relative', zIndex: 100 }}
              >
                <div className="text-4xl mb-2 relative z-[100]">{v.afterRelax ? "🧘" : "▶️"}</div>
                <div className="text-white font-medium relative z-[100]">{v.title}</div>
                <div className="text-gray-200 text-sm mt-1 relative z-[100]">
                  {v.duration} • {v.level}
                </div>
                {v.afterRelax && (
                  <div className="text-emerald-300 text-xs mt-1">Relaxation</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (section.type === "meditation") {
    // State for tracking which video is playing
    const [playingVideoId, setPlayingVideoId] = useState(null);

    // Video URLs for each meditation/yoga exercise
    const videoUrls = {
      "m-201": "https://www.youtube.com/embed/yqeirBfn2j4?si=uqTzcuYdv4NPO0QB", // Mountain Pose
      "m-202": "https://www.youtube.com/embed/8ln4XfRi6uw?si=gqrcAHDlmvTtyLbu", // Tree Pose
      "m-203": "https://www.youtube.com/embed/YRJ6xoiRcpQ?si=nmIeLZ4LdMLxqK9B", // Child's Pose
      "m-204": "https://www.youtube.com/embed/FdyhENXyIQ4?si=sN-vtJFl2CiaV9t7", // Lotus Pose
      "m-205": "https://www.youtube.com/embed/QgmmTEC3BgA?si=ULGH9S2KRLpHpiuC", // Seated Meditation
      "m-206": "https://www.youtube.com/embed/I77hh5I69gA?si=1a6M_OymGZxf_kiM", // Downward Dog
      "m-207": "https://www.youtube.com/embed/q-n_95JbHVM?si=HGJ6TLNvOk9vIee5", // Warrior II
      "m-208": "https://www.youtube.com/embed/t-7U1qW35TM?si=Meo7NZZomLAoR_Q4", // Meditation in Nature
    };

    const handleStartVideo = (videoId) => {
      setPlayingVideoId(playingVideoId === videoId ? null : videoId);
    };

    // Add slide scrolling for yoga/meditation images
    return wrap(
      <div className="space-y-6 relative z-[100] max-h-[60vh] overflow-y-auto pr-2">
        {/* Yoga and Meditation images with slide scrolling */}
        <div className="mb-4">
          <div className="text-white font-semibold mb-2 text-center">Yoga & Meditation Poses</div>
          <div
            className="flex gap-6 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {meditationImages.map((img, idx) => (
              <div
                key={img.src}
                className="flex flex-col items-center min-w-[160px] max-w-[180px] bg-white/10 rounded-lg p-3 border border-white/10 shadow-md snap-center"
                style={{ flex: "0 0 auto" }}
              >
                <a href={img.src} target="_blank" rel="noopener noreferrer">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-28 h-28 object-contain rounded-lg mb-2 animate-pulse"
                    loading="lazy"
                    draggable={false}
                    style={{ background: "#222" }}
                  />
                </a>
                <span className="text-xs text-white font-medium">{img.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Yoga and Meditation exercise list */}
        <div className="space-y-3">
          {section.items.map((m) => (
            <div key={m.id}>
              <div
                className="flex items-center gap-4 bg-white/20 rounded-lg p-4 hover:bg-white/25 transition relative z-[100] border border-white/10"
                style={{ position: 'relative', zIndex: 100 }}
              >
                <span className="text-2xl relative z-[100]">🧘</span>
                <div className="flex-grow relative z-[100]">
                  <div className="text-white font-medium">{m.title}</div>
                  <div className="text-gray-200 text-sm capitalize">{m.kind}</div>
                </div>
                <span className="text-gray-200 text-sm relative z-[100]">{m.duration}</span>
                <button 
                  className={`px-4 py-2 rounded-md transition relative z-[100] ${
                    playingVideoId === m.id 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                  onClick={() => handleStartVideo(m.id)}
                >
                  {playingVideoId === m.id ? 'Stop' : 'Start'}
                </button>
              </div>
              {/* Video player that appears when Start is clicked */}
              {playingVideoId === m.id && videoUrls[m.id] && (
                <div className="mt-3 bg-black/30 rounded-lg p-3 border border-white/10">
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={videoUrls[m.id] + "?rel=0&autoplay=1"}
                      title={m.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      frameBorder="0"
                    />
                  </div>
                  <div className="text-white text-sm mt-2 text-center">
                    {m.title} - {m.duration}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === "audio") {
    return wrap(
      <div className="space-y-3 relative z-[100] max-h-[60vh] overflow-y-auto pr-2">
        {section.items.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-4 bg-white/20 rounded-lg p-4 hover:bg-white/25 transition relative z-[100] border border-white/10"
            style={{ position: 'relative', zIndex: 100 }}
          >
            <span className="text-2xl relative z-[100]">🎵</span>
            <span className="flex-grow text-white font-medium relative z-[100]">{a.title}</span>
            <span className="text-gray-200 text-sm relative z-[100]">{a.duration}</span>
            <button
              className={`bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition relative z-[100]`}
              onClick={() =>
                playingAudioId === a.id
                  ? handlePauseAudio()
                  : handlePlayAudio(a.id)
              }
            >
              {playingAudioId === a.id ? "Pause" : "Play"}
            </button>
            {/* Audio player, only rendered for the currently playing audio */}
            {playingAudioId === a.id && (
              <AudioPlayer
                url={a.url}
                isPlaying={playingAudioId === a.id}
                onPlay={() => handlePlayAudio(a.id)}
                onPause={handlePauseAudio}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Features;