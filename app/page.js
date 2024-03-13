import React from 'react'
import '@/app/page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ApiExample from './ApiExample'

export default function home() {
  return (
    <>
      <h1>API-Liste</h1>
      <ApiExample />
    </>
  )
}
