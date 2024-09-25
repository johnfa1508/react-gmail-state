import Header from './components/Header'
import initialEmails from './data/emails'
import { useState, useMemo } from 'react'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [showStarred, setShowStarred] = useState(false)
  const [hideRead, setHideRead] = useState(false)

  const toggleRead = (targetEmail) => {
    const updatedEmails = emails.map(email => 
      email.id === targetEmail.id ? { ...email, read: !email.read } : email
    )

    setEmails(updatedEmails)
  }

  const toggleStarred = (targetEmail) => {
    const updatedEmails = emails.map(email => 
      email.id === targetEmail.id ? { ...email, starred: !email.starred } : email
    )

    setEmails(updatedEmails)
  }

  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      if (showStarred && !email.starred) return false;
      if (hideRead && email.read) return false;
      return true;
    });
  }, [emails, showStarred, hideRead]);

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={!showStarred ? 'item active' : 'item'}
            onClick={() => setShowStarred(false)}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={showStarred ? 'item active' : 'item'}
            onClick={() => setShowStarred(true)}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(email => email.starred).length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead ? true : false}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>

      <main className="emails">
        {filteredEmails.map((email) => {
          return (
            <li key = {email.id} className = {email.read ? 'email read' : 'email unread'}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
              </div>

              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStarred(email)}
                />
              </div>

              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          )
        })}
      </main>
    </div>
  )
}

export default App