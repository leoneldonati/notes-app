import { useState } from 'react'

function App () {
  const notesSaved = JSON.parse(localStorage.getItem('notes')) ?? []
  const [notes, setNotes] = useState(notesSaved)
  const [value, setValue] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()

    if (value === '') return

    const note = {
      id: crypto.randomUUID(),
      note: value.trim()
    }

    const newNotes = [...notes, note]

    setNotes(newNotes)
    setValue('')

    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  const handleClick = (id) => {
    const filteredNotes = notes.filter((item) => item.id !== id)

    const newNotes = [...filteredNotes]

    setNotes(newNotes)

    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  return (
    <main className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='max-w-lg w-full'>
        <section className='w-full h-[70vh] overflow-y-scroll border border-[#333] rounded-lg '>
          {notes.map((item) => {
            return (
              <div key={item.id}>
                <h3>{item.note}</h3>

                <button onClick={() => handleClick(item.id)}>
                  delete note
                </button>
              </div>
            )
          })}
        </section>

        <form
          onSubmit={handleSubmit}
          className='w-full mt-4 flex  items-center justify-between'
        >
          <input
            className=' ml-2'
            required
            onChange={({ target }) => setValue(target.value)}
            value={value}
            type='text'
            placeholder='Put your note here...'
          />
          <button className='mr-2 ml-2 p-2 min-w-fit'>save note</button>
        </form>
      </div>
    </main>
  )
}

export default App
