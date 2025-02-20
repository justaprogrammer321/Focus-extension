let blockedsitesarray = [];
let task_status=false;

// Get the blocked sites from local storage
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

// console.log(document.body)

//checking if the task status is true or false
chrome.storage.local.get('taskstatus', (item) => {
  if (chrome.runtime.lastError) {
    return false;
  } else {
    task_status = JSON.parse(item.taskstatus || 'false');
    console.log("this is the task status",task_status)
    if(task_status){
      const task_string="Learning best way to cook macroni"
      const task_keywords=[
        "macaroni", "pasta", "noodles", "boil", "cook", "water", "salt", "stir", "heat", "simmer",
        "drain", "rinse", "strain", "overcook", "undercook", "texture", "soft", "firm", "chewy", "sticky",
        "clump", "break", "starch", "sauce", "cheese", "cream", "butter", "milk", "garlic", "spices",
        "seasoning", "pepper", "basil", "oregano", "thyme", "parsley", "onion", "tomato", "broth", "oil",
        "pan", "pot", "lid", "spoon", "fork", "bowl", "plate", "timer", "measure", "ratio",
        "temperature", "steam", "sizzle", "burn", "stick", "gluten", "wholewheat", "protein", "fiber", "carbs",
        "instant", "quick", "slow", "bake", "roast", "microwave", "pressure", "stovetop", "lowheat", "highheat",
        "creamy", "spicy", "savory", "tangy", "rich", "mild", "flavor", "aroma", "herbs", "toppings",
        "grill", "melt", "simmer", "blend", "whisk", "mix", "spread", "layer", "reheat", "leftovers",
        "storage", "freeze", "thaw", "portion", "mealprep", "nutrition", "calories", "diet", "homemade", "fresh"
      ];
    
      //All the text tags from a web page
      const textTags = document.querySelectorAll("span, p, h1, h2, h3, h4, h5, h6");
      const page_text_tags = Array.from(textTags);
      // console.log("All text elements:", newArr);
    
      // Iterate and print text content
      let page_keywords:string[]=[];
      page_text_tags.forEach(element => {
        if(element.textContent && element.textContent?.length>0){
          let individual_strings=element.textContent.split(" ") || []
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
      console.log("This is the final similarity",jaccards_similarity)
    }
  }
})


