import {
  AnimatePresence,
  motion,
  useDragControls,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Framer() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const isColliding = useTransform(x, (x) => x > 100 && x < 200);
  const [comments, setComments] = useState([]);

  return (
    <div>
      <motion.div
        id="dropzone"
        style={{
          width: 100,
          height: 100,
          backgroundColor: isColliding ? "blue" : "red",
        }}
      >
      </motion.div>
      <motion.div
        id="666"
        drag
        style={{
          x,
          y,
          width: 50,
          height: 50,
          backgroundColor: "green",
        }}
      >
      </motion.div>
    </div>
  );
}
