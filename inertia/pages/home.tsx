import React, {useRef, useState} from "react";
import {getCsrfToken} from "~/utils";

export default function Home() {
  const [username, setUsername] = useState('')
  const [channel, setChannel] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)
  const csrfTokenInput = getCsrfToken()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChannelSelection = (channel: string) => {
    setChannel(channel)
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.requestSubmit()
      }
    }, 0)
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-16">
          <form ref={formRef} onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col items-center gap-16 p-10 rounded-md shadow-md">
            <div dangerouslySetInnerHTML={{__html: csrfTokenInput}}/>
            <div className="flex items-center gap-10">
              <label htmlFor="username" className="text-lg font-medium">Pseudo</label>
              <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex items-center gap-10">
              <h1>Canaux</h1>
              <button
                onClick={() => handleChannelSelection('general')}
                className="rounded-md text-zinc-950 bg-slate-300 hover:bg-slate-100 p-2 "
              >
                #general
              </button>
              <button
                onClick={() => handleChannelSelection('tech')}
                className="rounded-md text-zinc-950 bg-slate-300 hover:bg-slate-100 p-2"
              >
                #tech
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
