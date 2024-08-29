import { motion } from "framer-motion";

const SceneSelector = ({
  scenes,
  activeScene,
  onSceneChange,
}: {
  scenes: { id: number; name: string }[];
  activeScene: number;
  onSceneChange: (index: number) => void;
}) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">Scenes</h3>
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {scenes.map((scene, index) => (
        <motion.button
          key={scene.id}
          className={`px-4 py-2 rounded-md ${
            activeScene === index
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
          onClick={() => onSceneChange(index)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {scene.name}
        </motion.button>
      ))}
    </div>
  </div>
);

export default SceneSelector;
