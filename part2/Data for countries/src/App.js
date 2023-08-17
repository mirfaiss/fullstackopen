import { useEffect, useState } from 'react';
// import Note from './components/Note';
// import noteService from './services/notes'
// import Person from './components/Person';
// import personService from './services/persons'
import axios from 'axios';
import ViewListCountries from './components/country/ViewListCountries';
import MyComponent from './components/MyComponent';


const App = () => {

	const [value, setValue] = useState('')
	const [fetched, setFetched] = useState([])
	const [raw, setRaw] = useState([])
	const [listCountry, setListCountry] = useState([])


	const hook = () => {
		axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
			.then(res => {
				setRaw(res.data)
			})
			.catch(error => console.log(error))
	}

	useEffect(hook, [])


	const handleSearchOnchange = (event) => {
		const val = event.target.value
		// console.log('val :', val)
		setValue(val)

		const result = searchCountry(val)
		setFetched(result)

		// Return list country
		const list = result.map(x => x.name.common)
		setListCountry(list)

		console.log('Result :', result)
	}


	const searchCountry = (val) => {
		const list = raw.filter(x => x.name.common.toLowerCase().includes(val.toLowerCase()))
		return list
	}



	return (
		<div>
			<span>Find countries </span>
			<input value={value} onChange={handleSearchOnchange} />
			<br />

			<ViewListCountries listCountry={listCountry} fetched={fetched} />

			{/* <br />
			<br />
			<br /> */}
			{/* <MyComponent /> */}
		</div>
	)
}

export default App


// const App = () => {

// 	const [value, setValue] = useState('')
// 	const [allData, setAllData] = useState([])
// 	const [result, setResult] = useState([])
// 	const [onlyOne, setOnlyOne] = useState(null)
// 	// const [listToView, setListToView] = useState([])
// 	// const [submit, setSubmit] = useState(null)

// 	const hook = () => {
// 		axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(res => {


// 			setAllData(res.data)
// 			console.log(res.data)

// 		}).catch(error => error)
// 	}

// 	useEffect(hook, [])


// 	const handleSearchOnChange = (event) => {

// 		const val = event.target.value

// 		setValue(val)
// 		console.log('val :', val)

// 		const list = allData.map(x => x.name.common)
// 		const tampil = list.filter(x => x.toLowerCase().includes(val.toLowerCase()))

// 		// const list = data.map(x => x.filter(x => x.name.common.toLowerCase().includes(value.toLowerCase())))
// 		setResult(tampil)

// 		if (val === '') setResult([])
// 		if (tampil.length > 10) setResult(['Too many result, please specify the search..'])
// 		if (tampil.length === 1) {
// 			// jalan
// 			const country = allData.find(x => x.name.common === tampil[0])
// 			setOnlyOne(country)
// 			console.log('only one 1 :', onlyOne)
// 			return
// 		}
// 		// setOnlyOne(null)
// 		console.log('only one 2 :', onlyOne)
// 		console.log("tampil :", tampil)
// 	}


// 	return (
// 		<div>
// 			<span>find countries </span>
// 			<input value={value} onChange={handleSearchOnChange} />
// 			<br />
// 			<br />

// 			{result.map(x => {
// 				return (
// 					<>
// 						<span key={x}>{x}</span>
// 						<br />
// 					</>
// 				)
// 			})}


// 		</div>
// 	)
// }

// export default App

// const App = () => {
// 	const [value, setValue] = useState('')
// 	const [rates, setRates] = useState({})
// 	const [currency, setCurrency] = useState(null)

// 	useEffect(() => {
// 		console.log('effect run, currency is now', value)

// 		// skip if currency is not defined
// 		if (value) {
// 			console.log('fetching exchange rates...')
// 			axios
// 				.get(`https://open.er-api.com/v6/latest/${value}`)
// 				.then(response => {
// 					setRates(response.data.rates)
// 				})
// 		}
// 	}, [value])

// 	const handleChange = (event) => {
// 		setValue(event.target.value)
// 		// setCurrency(event.target.value)
// 	}

// 	// const onSearch = (event) => {
// 	// 	event.preventDefault()
// 	// 	setCurrency(value)
// 	// }

// 	return (
// 		<div>
// 			{/* <form > */}
// 			currency: <input value={value} onChange={handleChange} />
// 			<button type="submit">exchange rate</button>
// 			{/* </form> */}
// 			<pre>
// 				{JSON.stringify(rates, null, 2)}
// 			</pre>
// 		</div>
// 	)
// }

// export default App


// const Notification = ({ message }) => {

// 	if (message === null) {
// 		return null
// 	}

// 	return (
// 		<div className='error'>
// 			{message}
// 		</div>
// 	)
// }

// const Footer = () => {
// 	const footerStyle = {
// 		color: 'blue',
// 		fontStyle: 'italic'
// 	}
// 	return (
// 		<div>
// 			<p style={footerStyle}>&copy; Muhammad Irfa'issurur</p>
// 		</div>
// 	)
// }

// const App = () => {
// 	const [notes, setNotes] = useState(null)
// 	const [showAll, setShowAll] = useState(true)
// 	const [newNote, setNewNote] = useState('')
// 	const [errorMessage, setErrorMessage] = useState(null)



// 	const hook = () => {
// 		console.log('=> effect')
// 		noteService.getAll().then(res => {
// 			console.log('=> promise fulfilled')
// 			setNotes(res)
// 		})
// 		// axios.get('http://localhost:3001/notes').then(res => {
// 		// 	console.log('=> promise fulfilled')
// 		// 	setNotes(res.data)
// 		// })
// 	}

// 	useEffect(hook, [])

// 	if (!notes) return null

// 	const handleNoteOnChange = (event) => {
// 		setNewNote(event.target.value)
// 		// console.log(event.target.value)
// 	}

// 	const tambahNote = (event) => {
// 		event.preventDefault()

// 		const addNew = {
// 			id: notes.length + 1,
// 			content: newNote,
// 			important: Math.random() < 0.5
// 		}

// 		// axios.post('http://localhost:3001/notes', addNew).then(res => console.log('res:', res))
// 		noteService.create(addNew).then(res => {
// 			// console.log('res :', res)
// 			// console.log('res.data :', res.data)
// 			setNotes(notes.concat(res))
// 			console.log("new note :", addNew)
// 		})

// 		setNewNote('')
// 	}

// 	const toggleImportance = (id) => {
// 		let note = notes.find(x => x.id === id)
// 		console.log('Note id :', id, 'want to edit the importance', note)

// 		// const url = `http://localhost:3001/notes/${id}`
// 		const changedNote = { ...note, important: !note.important }

// 		noteService.update(id, changedNote).then(res => {

// 			setNotes(notes.map(x => x.id === id ? res : x))

// 		}).catch(error => {

// 			setErrorMessage(`The Note '${note.content}' was already deleted from server`)

// 			setTimeout(() => {
// 				setErrorMessage(null)
// 			}, 5000)

// 			setNotes(notes.filter(x => x.id !== id))
// 			// console.log('request failed!')
// 		})

// 		// axios.put(url, changedNote).then(res => {
// 		// 	setNotes(notes.map(x => x.id !== id ? x : res.data))
// 		// })

// 		// setNotes(note.map(x => !x.important))
// 		// console.log(notes)
// 	}

// 	const notesToShow = showAll ? notes : notes.filter(x => x.important === true)

// 	return (
// 		<>
// 			<h2>Notes</h2>

// 			<Notification message={errorMessage} />

// 			<input value={newNote} onChange={handleNoteOnChange} />
// 			<button type='submit' onClick={tambahNote}>tambah</button>
// 			<br />
// 			<br />

// 			<button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'}</button>

// 			<ul>
// 				{notesToShow.map(x => {
// 					return <Note key={x.id} note={x} importance={() => toggleImportance(x.id)} />
// 				})}
// 			</ul>

// 			<Footer />
// 		</>
// 	)
// }

// export default App



// const Notification = ({ message }) => {

// 	if (message === null) {
// 		return
// 	}

// 	return (
// 		<div className='notification'>
// 			{message}
// 		</div>
// 	)
// }

// const Error = ({ error }) => {
// 	if (error === null) {
// 		return
// 	}

// 	return (
// 		<div className='error'>
// 			{error}
// 		</div>
// 	)
// }

// const App = () => {

// 	const [persons, setPersons] = useState([])
// 	const [newName, setNewName] = useState('')
// 	const [newNumber, setNewNumber] = useState('')
// 	const [filtered, setFiltered] = useState([])
// 	const [querySearch, setQuerySearch] = useState('')
// 	const [message, setMessage] = useState(null)
// 	const [error, setError] = useState(null)

// 	const hook = () => {
// 		personService.getAll().then(res => {
// 			console.log(res)
// 			setPersons(res)
// 		})
// 		// axios.get('http://localhost:3001/persons').then(res => {
// 		// 	console.log("res.data : ", res.data)
// 		// 	setPersons(res.data)
// 		// })
// 	}

// 	useEffect(hook, [])


// 	const handleSearchOnChange = (event) => {
// 		const val = event.target.value
// 		// console.log(event.target.value)
// 		setQuerySearch(val)

// 		performSearch(val)
// 	}

// 	const handleNameOnchange = (event) => {
// 		setNewName(event.target.value)
// 	}

// 	const handleNumberOnchange = (event) => {
// 		setNewNumber(event.target.value)
// 	}

// 	const performSearch = (querySearch) => {
// 		const filterResult = persons.filter((x) => x.name.toLowerCase().includes(querySearch.toLowerCase()))
// 		setFiltered(filterResult)
// 	}


// 	// MENAMBAH ORANG BARU

// 	const addNewPerson = () => {

// 		const newPerson = {
// 			id: persons[persons.length - 1].id + 1,
// 			name: newName,
// 			number: newNumber
// 		}

// 		const replace = persons.find(x => x.name.toLowerCase() === newName.toLowerCase())
// 		const bool = replace ? true : false

// 		if (bool === true) {
// 			alert(`${newName} is already added to phonebook, replace the old number with a new one ?`)
// 			setMessage(`${newName} number is updated`)

// 			setTimeout(() => {
// 				setMessage(null)
// 			}, 5000);

// 			const getId = replace.id

// 			const updatePerson = { ...replace, number: newNumber }
// 			console.log('update person :', updatePerson)

// 			console.log('replace :', replace)
// 			console.log('replace.id :', getId)
// 			console.log('bool :', bool)

// 			return personService.update(getId, updatePerson).then(res => personService.getAll().then(res => {
// 				setPersons(res)
// 				// set form name and number to empty
// 				setNewName('')
// 				setNewNumber('')
// 			}))
// 		}

// 		setMessage(`Added ${newName}!`)

// 		setTimeout(() => {
// 			setMessage(null)
// 		}, 5000);

// 		personService.create(newPerson)
// 		// axios.post('http://localhost:3001/persons', newPerson)

// 		console.log('new person:', newPerson)
// 		setPersons(persons.concat(newPerson))

// 		// set form name and number to empty
// 		setNewName('')
// 		setNewNumber('')
// 	}



// 	// Hapus Kontak

// 	const hapus = (id) => {
// 		// axios.delete(`http://localhost:3001/persons/${id}`)

// 		const orang = persons.find(x => x.id === id).name

// 		personService.hapus(id)
// 			.then(res => {
// 				// Cara cepat tanpa meminta request dari server dengan personService.getAll().then(res => ...)
// 				const list = [...persons]
// 				const y = list.pop().name

// 				setPersons(list)

// 				setMessage(`${y} removed!`)

// 				setTimeout(() => {
// 					setMessage(null)
// 				}, 5000);
// 			})
// 			.catch(error => personService.getAll().then(res => {

// 				setPersons(res)
// 				setError(`Information of ${orang} has already have removed from server`)

// 				setTimeout(() => {
// 					setError(null)
// 				}, 5000);
// 			}))


// 	}

// 	const personToShow = (querySearch === '') ? persons : filtered

// 	return (
// 		<div>
// 			<h2>Phone Book</h2>

// 			<Notification message={message} />
// 			<Error error={error} />

// 			<p>Search : <input type='text' onChange={handleSearchOnChange} value={querySearch} /> </p>

// 			<p>Add new person :</p>
// 			<div>
// 				<ul>
// 					<li>Name : <input type='text' onChange={handleNameOnchange} value={newName} /></li>
// 					<li>Number : <input type='text' onChange={handleNumberOnchange} value={newNumber} /></li>
// 				</ul>
// 				<button onClick={addNewPerson}>Add</button>
// 			</div>
// 			<br />

// 			<h3>List Persons</h3>
// 			{/* <Persons personToShow={personToShow} action={() => hapus()} /> */}

// 			{personToShow.map(x => {
// 				return <Person key={x.id} person={x} hapus={() => hapus(x.id)} />
// 			})}
// 		</div>
// 	)

// }

// export default App







