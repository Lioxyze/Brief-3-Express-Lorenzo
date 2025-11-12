//  Récupérer toutes les recettes
export async function allRecipe(req, res, db) {
  const recipes = await db.all("SELECT * FROM recipes");
  res.json(recipes);
}

// Créer une recette
export async function createRecipe(req, res, db) {
  const { title, difficulty, budget, time, description } = req.body;

  const result = await db.run(
    "INSERT INTO recipes (title, difficulty, budget, time, description) VALUES (?, ?, ?, ?, ?)",
    [title, difficulty, budget, time, description]
  );

  res.status(201).json({
    message: "Recette ajoutée avec succès",
    recette: { id: result.lastID, title, difficulty, budget, time, description },
  });
}

// Mettre à jour une recette
export async function updateRecipe(req, res, db) {
  const { id } = req.params;
  const { title, difficulty, budget, time, description } = req.body;

  const result = await db.run(
    "UPDATE recipes SET title = ?, difficulty = ?, budget = ?, time = ?, description = ? WHERE id = ?",
    [title, difficulty, budget, time, description, id]
  );

  if (result.changes === 0) {
    return res.status(404).json({ error: "Recette non trouvée" });
  }

  res.json({ message: "Recette mise à jour avec succès" });
}

// Supprimer une recette
export async function deleteRecipe(req, res, db) {
  const { id } = req.params;
  const result = await db.run("DELETE FROM recipes WHERE id = ?", [id]);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Recette non trouvée" });
  }

  res.json({ message: "Recette supprimée avec succès" });
}