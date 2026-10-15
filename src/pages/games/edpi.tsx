import { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '@/components/Layout'

const games = {
	valorant: { name: 'VALORANT', yaw: 0.07 },
	cs2: { name: 'Counter-Strike 2', yaw: 0.022 },
	apex: { name: 'Apex Legends', yaw: 0.022 },
	overwatch: { name: 'Overwatch 2', yaw: 0.0066 },
} as const

type GameId = keyof typeof games

const inputClassName =
	'w-full rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5865f2]'
const inputStyle = {
	backgroundColor: '#202225',
	border: '1px solid #40444b',
	color: '#dcddde',
}

const EdpiPage: NextPage = () => {
	const [dpi, setDpi] = useState('800')
	const [sensitivity, setSensitivity] = useState('')
	const [sourceGame, setSourceGame] = useState<GameId>('valorant')
	const [targetGame, setTargetGame] = useState<GameId>('cs2')

	const dpiValue = Number(dpi)
	const sensitivityValue = Number(sensitivity)
	const hasValidInputs =
		dpi.trim() !== '' &&
		sensitivity.trim() !== '' &&
		Number.isFinite(dpiValue) &&
		Number.isFinite(sensitivityValue) &&
		dpiValue > 0 &&
		sensitivityValue > 0

	const edpi = hasValidInputs ? dpiValue * sensitivityValue : null
	const cmPer360 = hasValidInputs
		? (2.54 * 360) / (dpiValue * sensitivityValue * games[sourceGame].yaw)
		: null
	const convertedSensitivity = hasValidInputs
		? (sensitivityValue * games[sourceGame].yaw) / games[targetGame].yaw
		: null

	return (
		<Layout>
			<main
				className='min-h-screen px-6 py-12 sm:px-12'
				style={{ backgroundColor: '#36393f', color: '#dcddde' }}
			>
				<div className='mx-auto w-full max-w-3xl'>
					<header
						className='mb-6 rounded-lg p-8 text-center'
						style={{
							backgroundColor: '#2f3136',
							boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
						}}
					>
						<div
							className='mx-auto mb-6 h-1 w-16 rounded-full'
							style={{ backgroundColor: '#5865f2' }}
						/>
						<h1 className='mb-3 text-4xl font-extrabold text-white md:text-5xl'>
							eDPI Calculator (BETA)
						</h1>
						<p className='mx-auto max-w-xl text-base text-[#b9bbbe] md:text-lg'>
							Find your eDPI and convert your sensitivity to other games using the same sensivity scale.
						</p>
					</header>

					<section
						className='rounded-lg p-6 sm:p-8'
						style={{
							backgroundColor: '#2f3136',
							boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
						}}
						aria-labelledby='settings-heading'
					>
						<h2 id='settings-heading' className='mb-6 text-xl font-bold text-white'>
							Your settings
						</h2>

						<div className='grid gap-5 sm:grid-cols-2'>
							<label className='block text-sm font-medium text-[#b9bbbe]'>
								Mouse DPI
								<input
									className={`${inputClassName} mt-2`}
									style={inputStyle}
									type='number'
									min='1'
									step='1'
									inputMode='numeric'
									value={dpi}
									onChange={(event) => setDpi(event.target.value)}
									placeholder='800'
								/>
							</label>

							<label className='block text-sm font-medium text-[#b9bbbe]'>
								In-game sensitivity
								<input
									className={`${inputClassName} mt-2`}
									style={inputStyle}
									type='number'
									min='0'
									step='any'
									inputMode='decimal'
									value={sensitivity}
									onChange={(event) => setSensitivity(event.target.value)}
									placeholder='e.g. 0.35'
								/>
							</label>

							<label className='block text-sm font-medium text-[#b9bbbe]'>
								Current game
								<select
									className={`${inputClassName} mt-2`}
									style={inputStyle}
									value={sourceGame}
									onChange={(event) => setSourceGame(event.target.value as GameId)}
								>
									{Object.entries(games).map(([id, game]) => (
										<option key={id} value={id}>
											{game.name}
										</option>
									))}
								</select>
							</label>

							<label className='block text-sm font-medium text-[#b9bbbe]'>
								Convert to
								<select
									className={`${inputClassName} mt-2`}
									style={inputStyle}
									value={targetGame}
									onChange={(event) => setTargetGame(event.target.value as GameId)}
								>
									{Object.entries(games).map(([id, game]) => (
										<option key={id} value={id}>
											{game.name}
										</option>
									))}
								</select>
							</label>
						</div>

						<div
							className='my-7'
							style={{ borderTop: '1px solid #40444b' }}
							aria-hidden='true'
						/>

						{hasValidInputs ? (
							<div className='grid gap-4 sm:grid-cols-3' aria-live='polite'>
								<div className='rounded p-5' style={{ backgroundColor: '#202225' }}>
									<p className='mb-2 text-sm text-[#b9bbbe]'>Your eDPI</p>
									<p className='text-2xl font-bold text-white'>
										{edpi?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
									</p>
									<p className='mt-2 text-xs text-[#72767d]'>DPI x sensitivity</p>
								</div>
								<div className='rounded p-5' style={{ backgroundColor: '#202225' }}>
									<p className='mb-2 text-sm text-[#b9bbbe]'>
										{games[targetGame].name} sensitivity
									</p>
									<p className='break-all text-2xl font-bold text-white'>
										{convertedSensitivity?.toLocaleString(undefined, {
											maximumFractionDigits: 4,
										})}
									</p>
									<p className='mt-2 text-xs text-[#72767d]'>Same cm/360 turn distance</p>
								</div>
								<div className='rounded p-5' style={{ backgroundColor: '#202225' }}>
									<p className='mb-2 text-sm text-[#b9bbbe]'>Distance per 360</p>
									<p className='text-2xl font-bold text-white'>
										{cmPer360?.toLocaleString(undefined, { maximumFractionDigits: 2 })}{' '}
										<span className='text-base font-medium text-[#b9bbbe]'>cm</span>
									</p>
									<p className='mt-2 text-xs text-[#72767d]'>At your current settings</p>
								</div>
							</div>
						) : (
							<p className='rounded p-4 text-sm text-[#b9bbbe]' style={{ backgroundColor: '#202225' }}>
								Enter a DPI and sensitivity greater than zero to see your results.
							</p>
						)}

						<p className='mt-5 text-xs leading-relaxed text-[#b9bbbe]'>
							This is not 100% tested but values should be validated by your own testing. This is a work in progress and will be improved over time. 
						</p>
					</section>
				</div>
			</main>
		</Layout>
	)
}

export default EdpiPage
