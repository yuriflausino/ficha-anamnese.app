// Quando o formulário for enviado
document.getElementById("formPaciente").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Coleta os dados do formulário
  const paciente = {
    nome: document.getElementById("nome").value,
    data_nascimento: document.getElementById("data_nascimento").value,
    telefone: document.getElementById("telefone").value,
    historico: document.getElementById("historico").value,
    observacoes: document.getElementById("observacoes").value,
    diabetes: document.getElementById("diabetes").value === "Sim",
    cardiovascular: document.getElementById("cardiovascular").value === "Sim",
    hipertensao: document.getElementById("hipertensao").value === "Sim",
    alergias: document.getElementById("alergias").value === "Sim",
    medicamentos: document.getElementById("medicamentos").value === "Sim"
  };

  try {
    const response = await fetch("/api/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paciente)
    });

    if (response.ok) {
      alert("✅ Ficha salva com sucesso!");
      e.target.reset(); // limpa o formulário
    } else {
      alert("❌ Erro ao salvar ficha.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("❌ Erro de conexão com o servidor.");
  }
});
