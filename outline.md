# QUESTION TIME

## Summary
A trivia game that can be played either solo or with another player. It features a 3x3 grid displaying the number of points that the corresponding question are worth. Once confirmed, the question is then displayed

#### HTML
##### Landing page
- [ ] Logo section
- [ ] Game select 
- [ ] Game instructions/summary
- [ ] Confirm button
##### Game page
- [x] Logo section
	- [ ] text logo (designed logo if possible)
- [ ] Scores section
	- [ ] Scores display
	- [ ] points on the line display
- [x] Choices grid
	- [x] Grid of divs
	- [x] confirm button
- [ ] Question and answers
	- [x] div for question
	- [x] div to hold div of answers
	- [x] confirm button
	- [ ] next question button
#### CSS
- [x] Mesh background
- [x] Dark theme
##### Mobile 
- [x] Logo section - larger relative to viewport
- [ ] Scores section - larger relative to viewport
- [x] Choices - 3x3 grid via css grid
- [x] Question and answers - Flex column for both questions and answers
##### Desktop 
- [ ] Logo section - smaller relative to viewport
- [ ] Scores section - smaller relative to viewport
- [ ] Choices - 3x3 grid via css grid
- [ ] Question and answers - flex column for entire section and css grid for answers
#### JS
##### MVP
- [ ] Game runs for a set number of rounds
- [x] Generate questions for grid
- [x] Each grid item represents one question
- [x] Confirm button triggers question to appear and choices grid to disappear
- [x] Question that appears corresponds to grid item clicked
- [ ] Correct question is highlighted when confirmed
- [ ] Grid reappears when next question button is clicked
- [ ] Grid item that corresponds to previously selected question(s) is unavailable
##### Bonus
- [ ] Multiplier applied for consecutive correct questions
