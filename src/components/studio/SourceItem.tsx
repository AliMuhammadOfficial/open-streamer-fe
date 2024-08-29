import { motion } from "framer-motion";
import React from "react";

const SourceItem = ({
    source,
  }: {
    source: { id: number; name: string; icon: React.ReactNode };
  }) => (
    <motion.div
      className="bg-card p-3 rounded-md mb-2 cursor-move"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center">
        {source.icon && React.isValidElement(source.icon)
          ? React.createElement(source.icon, { className: "mr-2 h-5 w-5" })
          : null}
        <span>{source.name}</span>
      </div>
    </motion.div>
  );

export default SourceItem;