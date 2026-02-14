import Skill from '../models/Skill.js';

export const getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ name: 1 });
  res.json(skills);
};

export const seedSkills = async (req, res) => {
  const defaults = ['React', 'JavaScript', 'Node.js', 'SQL', 'System Design'];
  await Promise.all(defaults.map((name) => Skill.updateOne({ name }, { name }, { upsert: true })));
  const skills = await Skill.find();
  res.status(201).json(skills);
};
