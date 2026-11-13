import { motion } from "framer-motion";

const SectionCard = ({ title, icon: Icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-[#30363D] bg-[#161B22] shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#30363D]">
        <Icon size={20} className="text-[#58A6FF]" />

        <h2 className="font-semibold text-lg">
          {title}
        </h2>
      </div>

      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
};

export default SectionCard;