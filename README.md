# HTML-JS-SBA

Net Zero calculator

Theme:
A website to teach users what it takes to go "net-zero". The site is centered around a form in which users enter information
about their energy use. The site then takes them to a page displaying how many trees they should plant to be "net-zero".
Site colors should be dark blue, grey, and black with some white and forest green accents to reflect the colors of the earth.

Index.html:
Please begin at this page. Contains a jumbotron with a brief summary of the site.
On the jumbotron is an image of the earth. Featured prominently is a button that brings users to the main form.
Underneath jumbotron are links to informative external articles.

    Contains the following elements:
    Inline and external css
    Bootstrap grid layout, cards, jumbotron, navbar
    Pseudo-classes (hover over the earth or article links)

Form page:
Contains a small header with the website name. Below are several input boxes prompting the user for their country,
how much they drive, how much meat they consume, and other statistics used to calculate carbon footprint. If user enters
invalid input, a notification is shown. User can click submit when all required fields are entered. Relevant data is passed
to the next page via url query.

    Contains the following elements:
    Form elements (name, number, radio buttons, select)
    Embedded and inline css
    External javascript

Result page:
Links to this page are disabled by default as users are expected to fill out the form first.
Page contains a small header with the website name. Below is a table of user details
and tree icons printed to visualize the number of trees required to be "net-zero".

    Contains the following elements:
    HTML table
    Bootstrap grid layout
    Embedded and inline css
    Embedded javascript
    Regex used to read values from url
