const validateData = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formatted = result.error.format();

      const flatErros = Object.values(formatted)
        .flat()
        .filter(Boolean)
        .map((err) => err._errors)
        .flat();

      return res.status(400).json({ message: result.error.format() });
    }
    next();
  };
};

export { validateData };
