function handleSubmitArticle(e) {
  e.preventDefault();
  const url = document.getElementById("test-url").value;

  if (!url) return;

  console.log(url);
  fetch("/api/page-analysis", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: url })
  })
  .then(res => res.json())
  .then(result => {
    document.getElementById("polarity").innerHTML = result.polarity;
    document.getElementById("subjectivity").innerHTML = result.subjectivity;
    document.getElementById("polarity_confidence").innerHTML = result.polarity_confidence;
    document.getElementById("subjectivity_confidence").innerHTML = result.subjectivity_confidence;
    document.getElementById("excerpt").innerHTML = result.text;
  })
  .catch(err=>{
    console.log(err);
  })
}

export { handleSubmitArticle };
