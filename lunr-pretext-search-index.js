var ptx_lunr_search_style = "textbook";
var ptx_lunr_docs = [
{
  "id": "front-back-matter_the-content-and-structure-of-this-book",
  "level": "1",
  "url": "front-back-matter_the-content-and-structure-of-this-book.html",
  "type": "Subsection",
  "number": "1.1",
  "title": "The Content and Structure of this Book",
  "body": " The Content and Structure of this Book  The projects in this book require you to learn:     HTML    CSS    Javascript    Python    A variety of Python modules    Data Modeling and SQL     Any of these would be enough for a single course! And in fact you can probably find courses that will go into more depth on any of these things at your school.  So, I am going to ask you to do things that are not explicitly covered in the book. I may not lecture on them. If you just want to regurgitate what is in lecture you won't learn much, and the knowledge you gained would be obsolete in a year or so anyway. In this book what I hope to emphasize is the context , the background and the essentials that will equip you to find the details you need on your own.  What I mean by context and background includes answering questions like:     What is a markup language and what should you expect from a good one? This will arm you to find the specific tag you need to do the job you want rather than asking you to memorize all of the tags in the HTML language.    How does a typical web application work? Including a little bit about how the internet itself operates so that you will see the logic behind how the browser and the web server work together and communicate with each other at different levels.     If this book was a reference manual for HTML, Javascript, etc. it would be hundreds of thousands of pages long, and it would be horrible. There are great dedicated resources for all of them. This course is about how we integrate them.  "
},
{
  "id": "front-back-matter_the-content-and-structure-of-this-book-5",
  "level": "2",
  "url": "front-back-matter_the-content-and-structure-of-this-book.html#front-back-matter_the-content-and-structure-of-this-book-5",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "context background essentials "
},
{
  "id": "front-back-matter_learning-zones",
  "level": "1",
  "url": "front-back-matter_learning-zones.html",
  "type": "Subsection",
  "number": "1.2",
  "title": "Learning Zones",
  "body": " Learning Zones  I'm a big believer in the Learning Zone concept, and in this class I want you to be in the learning zone. In class, when you are working on projects, or listening to a lecture you are not being judged. This is the time to make crazy mistakes and ask questions that might seem stupid. You should feel challenged as we work on solving problems and developing solutions together. you should not feel like the solution will just flow from the depths of your brain to your finger tips like so much water flowing down stream. Programming is hard work and to the extent your instructor makes it look easy while standing in front of you, that is part of the performance of teaching and not the reality of the doing.   From time to time you will be asked to respond to a poll about what zone you were in on a particular day.  There is a second definition of the learning zone that is related to what we have been talking about. In this amazing TED talk: How to get better at the things you care about Eduardo Briceño talks about the performance zone versus the learning zone.   The big takeaway for you is that as a student in the classroom for this class, you are in the learning zone as Briceño defines it. You are not being judged or graded for how quickly you arrive at an answer or not! The classroom for this course is a time for you to practice old skills, try new skills, and to fail without repercussions. That is how we learn! You will spend a huge amount of the rest of your life in the performance zone, so take advantage of this opportunity and enjoy the chance to be in the learning zone.  Web programming would not exist without the world of open source. Neither would this book. Especially parts of the Flask chapter which are taken directly from the Flask documentation and used under the terms of their license.  Brad Miller September 2019  "
},
{
  "id": "front-back-matter_learning-zones-2",
  "level": "2",
  "url": "front-back-matter_learning-zones.html#front-back-matter_learning-zones-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "should should not "
},
{
  "id": "front-colophon",
  "level": "1",
  "url": "front-colophon.html",
  "type": "Colophon",
  "number": "",
  "title": "Colophon",
  "body": "  "
},
{
  "id": "sec-section-name",
  "level": "1",
  "url": "sec-section-name.html",
  "type": "Section",
  "number": "1.1",
  "title": "Section Title",
  "body": " Section Title  Text of section.  "
},
{
  "id": "backmatter-2",
  "level": "1",
  "url": "backmatter-2.html",
  "type": "Colophon",
  "number": "",
  "title": "Colophon",
  "body": " This book was authored in PreTeXt .  "
}
]

var ptx_lunr_idx = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('body')
  this.metadataWhitelist = ['position']

  ptx_lunr_docs.forEach(function (doc) {
    this.add(doc)
  }, this)
})
