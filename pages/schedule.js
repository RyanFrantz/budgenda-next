/*
 * NOTE: Keep this page on its own while I explore some new UI.
 * If this pans out, I'll fold it into the main page.
 */

import Head from 'next/head';
import Script from 'next/script';

export default function Schedule() {
  return (
    <>
    <Head>
        <meta name="description" content="Meeting minutes, it didn't happen!" />
    </Head>

    <nav>
        <input type="date" id="agenda-date" name="agenda-date" defaultValue="2022-06-28" />
        <input type="time" id="agenda-time" name="agenda-time" defaultValue="12:00" />
        <button onClick={createAgenda}>Create Agenda</button>
    </nav>
    <main>
    </main>

    <Script src="js/budgenda-schedule.js" />

    </>
  )
}
