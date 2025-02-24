import nlp from "compromise"
let blockedsitesarray = [];
let task_status=false;


// ==============================
// Get block sites from localstorage
// ==============================

chrome.storage.local.get('blockedsites', (item) => {
  if (chrome.runtime.lastError) {
    console.error("Storage error:", chrome.runtime.lastError);
  } else {
    const blockedsites = JSON.parse(item.blockedsites || "[]");
    blockedsitesarray = blockedsites;
    console.log("this script ran")

    for (let i = 0; i < blockedsitesarray.length; i++) {
      console.log(blockedsitesarray[i]);
      console.log(window.location.origin);
      if (window.location.origin === blockedsitesarray[i]) {
        document.body.innerHTML = `<p>This is a blocked link: ${blockedsitesarray[i]}</p>`;
        break;  
      }
    }
  }
});



// ==============================
// Code to remove stopwords and punctuations
// ==============================


const stopwords = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can",
  "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
  "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have",
  "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him",
  "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't",
  "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor",
  "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
  "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so",
  "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then",
  "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those",
  "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll",
  "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which",
  "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd",
  "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
]);

const punctuationRegex = /[!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/g;

export function removePunctuationsandStopwords(text:string){
return  text
      .replace(punctuationRegex," ")
      .split(" ")
      .filter((word)=> !stopwords.has(word))
}



//checking if the task status is true or false
chrome.storage.local.get('taskstatus', (item) => {
  if (chrome.runtime.lastError) {
    return false;
  } else {
    task_status = JSON.parse(item.taskstatus || 'false');

    console.log("this is the task status",task_status)

    chrome.storage.local.get('taskkeywords',(item)=>{
      if(chrome.runtime.lastError){
        console.error(chrome.runtime.lastError)
      }
      else{
        const task_keywords_from_local=JSON.parse(item.taskkeywords || []);

        if(task_status){
          const task_string="Learning best way to cook macroni"
          const task_keywords=task_keywords_from_local
        
          //All the text tags from a web page
          const textTags = document.querySelectorAll("span, p, h1, h2, h3, h4, h5, h6");
          const page_text_tags = Array.from(textTags);
          // console.log("All text elements:", newArr);
        
          // Iterate and print text content
          let page_keywords:string[]=[];
          page_text_tags.forEach(element => {
            if(element.textContent && element.textContent?.length>0){
              let individual_strings=removePunctuationsandStopwords(element.textContent);
              individual_strings.forEach((item)=>{
                page_keywords.push(item)
              })
              // page_tags_string.push(string_to_csv)
            }
          });
        
          // console.log(page_tags_string)
        
          /*  Jaccards Algorithm  */
        
          //turn the task_keywords and page_keywords into sets
          function setIntersection(setA:Set<string>, setB:Set<string>) {
            return new Set([...setA].filter(element => setB.has(element)));
          }
        
          function setUnion(setA:Set<string>, setB:Set<string>) {
            return new Set([...setA, ...setB]);
          }
          const page_keywords_set=new Set<string>(page_keywords)
          const task_keywords_set=new Set<string>(task_keywords)
          const intersection_of_keywords=setIntersection(page_keywords_set,task_keywords_set)
          const union_of_keywords=setUnion(page_keywords_set,task_keywords_set)
        
          const jaccards_similarity=intersection_of_keywords.size/union_of_keywords.size
          console.log(intersection_of_keywords)
          console.log("This is the final similarity",jaccards_similarity)
          if(jaccards_similarity<0.01){
            document.body.innerHTML = `<p>This website is not realted to task </p>`;
          }
        }
      }
    })

  }
})


