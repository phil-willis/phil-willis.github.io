const fs = require('fs-extra')
const inquirer = require('inquirer')

const mdTemplate = ({ title, excerpt }) => `---
title: '${title}'
excerpt: '${excerpt}'
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---


# Overview of ${title}

`

const createNewPost = (title, excerpt) => {
  const titleFormatted = title.replace(/\s+/g, '_')
  const FILE_PATH_PREFIX = '_posts'
  const FILE_PATH = `${FILE_PATH_PREFIX}/${titleFormatted}`

  if (!fs.existsSync()) {
    const fileName = `${FILE_PATH}.md`
    const fileContent = mdTemplate({ title, excerpt })
    fs.writeFileSync(fileName, fileContent, (err) => {
      if (err) throw err
      console.log('The file was succesfully saved!')
    })
  }
}

// Prompt types: [list, rawlist, expand, checkbox, confirm, input, password, editor]
const promptQuestions = [
  {
    type: 'command',
    name: 'title',
    message: 'Short title',
  },
  {
    type: 'command',
    name: 'excerpt',
    message: 'Give an excerpt',
  },
]

inquirer.prompt(promptQuestions).then((answers) => {
  const { title, excerpt } = answers
  const shortTitle = title.substring(0, 20)
  createNewPost(shortTitle, excerpt)
})
