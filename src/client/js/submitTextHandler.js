function handleSubmit(e) {
  e.preventDefault();
  const text = document.getElementById("test-statement").value;
  if (!text) return;

  fetch("/api/text-analysis", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(result => {
    document.getElementById("text_polarity").innerHTML = result.polarity;
    document.getElementById("text_subjectivity").innerHTML =
      result.subjectivity;
    document.getElementById("text_polarity_confidence").innerHTML =
      result.polarity_confidence;
    document.getElementById("text_subjectivity_confidence").innerHTML =
      result.subjectivity_confidence;
  })
  .catch(err=>{
    console.log(err);
  })
}

export { handleSubmit };
