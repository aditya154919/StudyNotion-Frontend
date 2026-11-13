const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-[#0D1117] border border-[#30363D] rounded-lg px-3 py-2 outline-none"
    >
      <option value="cpp">C++</option>
      <option value="java">Java</option>
      <option value="python">Python</option>
    </select>
  );
};

export default LanguageSelector;