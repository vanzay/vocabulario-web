export default <Record<string, string>>{
    "app.title": "Vocabulario",
    "app.tagline": "Boost your vocabulary",
    "app.navi.materials": "All materials",
    "app.navi.shelf": "Shelf",
    "app.navi.dictionary": "Dictionary",
    "app.navi.help": "Help",
    "app.copyright": "© Vocabulario, 2016-2026",
    "app.about": "About",
    "app.help": "Help",

    "lang.native.ru": "Русский",
    "lang.native.en": "English",
    "lang.native.es": "Español",

    "page.not.found": "Page not found",
    "phrase.not.found": "Phrase not found",
    "outdated.link": "Link is outdated",
    "no.required.fields": "Not all fields ara filled",
    "unexpected.error": "Unexpected error",
    "or": "or",

    "action.login": "Log in",
    "action.logout": "Log out",
    "action.register": "Register",
    "action.restore": "Restore",
    "action.change.password": "Change password",
    "action.enter": "Enter",
    "action.upload.book": "Upload text",
    "action.find.book": "Choose text",
    "action.choose.file": "Choose file",
    "action.upload": "Upload",
    "action.save": "Save",
    "action.find": "Find",
    "action.show.more": "Show more",
    "action.add.familiar": "Add as familiar",
    "action.add.unfamiliar": "Add for studying",

    "label.username": "Email",
    "label.password": "Password",
    "label.new.password": "New password",
    "label.language": "Language",
    "label.book.title": "Title",
    "label.book.author": "Author",
    "label.book.content": "Content ({{formats}})",
    "label.book.cover.url": "Cover URL",
    "label.book.is.translation": "Is translation",
    "label.book.content.url": "Content URL",
    "label.book.audio.content.url": "Audio content URL",
    "label.all.languages": "All languages",
    "label.show.only.on_studying": "\"On studying\" only",
    "label.comfort": "Comfort",
    "label.reading.comfort": "Comfort",
    "label.progress": "Progress",
    "label.book.info": "Text info",
    "label.dictionary.info": "My vocabulary info",
    "label.select.all": "Select all",
    "label.translation": "Translation",

    "login.forgot": "Forgot password?",
    "login.wrong.auth.params": "Wrong email or password",
    "register.user.exists.already": "Email is busy",
    "invalid.email": "Invalid email",
    "invalid.password": "Too short password (5 chars minimum)",
    "account.access": "Access to your account",
    "forgot.password.sent": "New password has been sent to <b>{{email}}</b>.<br/>In case you haven't received the email, please contact us:<br/><a href=\"mailto:support@vocabular.io\">support@vocabular.io</a>",

    "header.phrase.translation": "Translation",
    "header.phrase.term": "Term",

    "shelf.list.title": "Shelf",
    "shelf.intro": "There are no added materials. Add a text you want to read, mark words you know and words you want to study. These words will be saved in your personal dictionary and this info will be used further for other texts.",
    "shelf.book.title": "Title",
    "shelf.book.language": "Language",
    "shelf.book.progress": "{{added}} of {{uniqueGroups}} words",

    "shelf.upload.title": "Text uploading",
    "file.cant.be.empty": "File can't be empty",
    "wrong.file.type": "Supported file formats: {{formats}}",
    "max.file.size": "Max file size: {{maxSize}} MB",
    "unsupported.language": "Language of the uploaded text is unsupported",
    "upload.limitation": "You can upload up to 10 files every 24 hours",

    "book.not.found": "Text not found",
    "book.training": "Training",
    "book.train.writing": "Writing",
    "book.train.listening": "Listening",
    "book.buy.text": "Buy book",
    "book.buy.audio": "Buy audio book",
    "book.info.title": "Title",
    "book.info.language": "Language",
    "book.info.total.phrases": "Total words",
    "book.info.unique.phrases": "Unique",
    "book.info.in.vocabulary": "In my vocabulary",
    "book.info.unfamiliar": "On studying",
    "book.phrase.tab.new": "New words",
    "book.phrase.tab.added": "In my vocabulary",
    "book.phrase.term.frequency": "Term frequency",

    "training.you.should.choose.dictionary": "You should choose either a dictionary or a certain text",
    "training.writing.title": "Training — writing",
    "training.listening.title": "Training — listening",
    "training.take.break": "There are no words for studying",
    "training.try.another.book": "Train another text",
    "training.hint": "Hint",
    "training.check.answer": "Check answer / Next word",
    "training.skip": "Skip",

    "dictionary.title": "Dictionary",
    "dictionary.empty": "Dictionary is empty",
    "dictionary.add.from.book": "Add words from text",
    "dictionary.info.language": "Language",
    "dictionary.info.familiar.phrases": "Familiar",
    "dictionary.info.unfamiliar.phrases": "On studying",
    "dictionary.info.total.phrases": "Total words",
    "dictionary.progress": "Progress",
    "dictionary.search.term": "Search term",
    "dictionary.move.to.studying": "Study",
    "dictionary.move.to.familiar": "I know",
    "dictionary.remove.words": "Remove",
    "dictionary.export.to.csv": "Export to CSV",

    "about.title": "About project",
    "about.text": `
<p><b>Vocabulario</b> is a service for expanding your foreign language vocabulary.</p>
<p>This service will help you read a book, watch a movie, or listen to a podcast in a foreign language without having to look up words in a dictionary.</p>
<p>More details on how it works you can find <a href='/help'>here</a>.</p>
<p>Contact us by email <a href='mailto:support@vocabular.io'>support@vocabular.io</a>.</p>`,

    "help.title": "Help",
    "help.text": `
<h3>Adding words to your dictionary</h3>
<p>Select the text you want to read (to listen to etc.) either in the <a href='/'>All materials</a> section or in the <a href='/shelf'>Shelf</a> section.</p>
<p>All words in the text are sorted in descending order of frequency. To see word forms, hover over the frequency number.<img src='/images/help/05.png' alt='' style='display: block; margin: 0 auto;'/></p>
<p>Update your dictionary:</p>
<ul>
<li>Select the unfamiliar words you want to learn. Click \"Add for studying\" button.</li>
<li>Then select the remaining words and click \"Add as familiar\" button.</li>
<li>Load the next group of words and repeat the previous steps.</li></ul>
<p>Each processed word will appear in your dictionary and will be taken into account when processing future texts.</p>
<h3>Adding texts</h3>
<p>You can upload your own text (subtitles etc.) in the <a href='/shelf'>Shelf</a> section.</p>
<p>All added text will also be saved here.</p>
<h3>Working with your dictionary</h3>
<p>In the <a href='/dictionary'>Dictionary</a> section, you can change the translation of a word and make other changes to your personal dictionary.</p>
<p>To open the editing window, click on a word.<img src='/images/help/07.png' alt='' style='display: block; margin: 0 auto;'/></p>
<p>After each change, the service calculates the \"Comfort\" indicator (the percentage of text comprehension based on all the words in your vocabulary).<img src='/images/help/08.png' alt='' style='display: block; margin: 0 auto;'/> </p>
<p>We recommend starting to read the text when the \"Comfort\" parameter value exceeds 50%.</p>
<h3>Training</h3>
<p>You can learn your entire personal dictionary, as well as specific texts. Click \"Writing\" or \"Listening\" in the corresponding section.<img src='/images/help/09.png' alt='' style='display: block; margin: 0 auto;'/></p>
<p>Feel free to use hints during your training.<img src='/images/help/10.png' alt='' style='display: block; margin: 0 auto;'/> <img src='/images/help/11.png' alt='' style='display: block; margin: 0 auto;'/> <img src='/images/help/12.png' alt='' style='display: block; margin: 0 auto;'/></p>`,
}
