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

const colors = {
	page: '#1b1a17',
	surface: '#24231f',
	surfaceRaised: '#2c2a24',
	control: '#1d1c19',
	border: '#403d33',
	text: '#f1eee6',
	muted: '#b5afa2',
	subtle: '#847e72',
	accent: '#d6a15d',
	low: '#55c99a',
	medium: '#f0b34f',
	high: '#ed7568',
}

const edpiRanges: Record<GameId, { lowMax: number; mediumMax: number }> = {
	valorant: { lowMax: 200, mediumMax: 400 },
	cs2: { lowMax: 800, mediumMax: 1600 },
	apex: { lowMax: 800, mediumMax: 1600 },
	overwatch: { lowMax: 3200, mediumMax: 6000 },
}

const inputClassName =
	'w-full rounded-xl px-4 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#d6a15d]'
const inputStyle = {
	backgroundColor: colors.control,
	border: `1px solid ${colors.border}`,
	color: colors.text,
}

type EdpiRangeGraphProps = {
	gameId: GameId
	edpi: number | null
	heading: string
	description: string
}

const EdpiRangeGraph = ({ gameId, edpi, heading, description }: EdpiRangeGraphProps) => {
	const range = edpiRanges[gameId]
	const currentRange =
		edpi === null ? null : edpi <= range.lowMax ? 'Low' : edpi <= range.mediumMax ? 'Medium' : 'High'
	const graphMax = Math.max(range.mediumMax * 1.5, edpi === null ? 0 : edpi * 1.15)
	const lowWidth = (range.lowMax / graphMax) * 100
	const mediumWidth = ((range.mediumMax - range.lowMax) / graphMax) * 100
	const markerPosition = edpi === null ? null : Math.min((edpi / graphMax) * 100, 100)
	const formattedEdpi = edpi?.toLocaleString(undefined, { maximumFractionDigits: 2 })

	return (
		<div
			className='rounded-2xl border p-5 sm:p-6'
			style={{ backgroundColor: colors.surface, borderColor: colors.border }}
		>
			<div className='mb-5'>
				<p className='text-xs font-semibold uppercase tracking-[0.16em]' style={{ color: colors.subtle }}>
					{heading}
				</p>
				<h3 className='mt-2 text-lg font-bold' style={{ color: colors.text }}>
					{games[gameId].name}
				</h3>
				<p className='mt-1 text-sm' style={{ color: colors.muted }}>
					{description}
				</p>
			</div>

			{edpi !== null && currentRange ? (
				<p className='mb-3 text-sm font-semibold' style={{ color: colors.text }} aria-live='polite'>
					{currentRange} range · {formattedEdpi} eDPI
				</p>
			) : null}

			<div
				className='relative pt-8'
				role='img'
				aria-label={
					markerPosition === null
						? `Approximate low, medium, and high eDPI ranges for ${games[gameId].name}. Enter settings to show your eDPI.`
					: `Your eDPI would be ${formattedEdpi} in ${games[gameId].name}, in the ${currentRange} range.`
				}
			>
				{markerPosition !== null ? (
					<div
						className='absolute top-0 z-10 whitespace-nowrap rounded px-2 py-1 text-xs font-bold text-white'
						style={{
							left: `${markerPosition}%`,
							transform:
								markerPosition < 8
									? 'translateX(0)'
									: markerPosition > 92
										? 'translateX(-100%)'
										: 'translateX(-50%)',
							backgroundColor: colors.accent,
						}}
					>
						You
					</div>
				) : null}
				<div className='relative'>
					<div
						className='flex h-4 overflow-hidden rounded-full'
						style={{ backgroundColor: colors.high }}
					>
						<div style={{ width: `${lowWidth}%`, backgroundColor: colors.low }} />
						<div style={{ width: `${mediumWidth}%`, backgroundColor: colors.medium }} />
					</div>
					{markerPosition !== null ? (
						<div
							className='absolute -bottom-1 -top-1 z-10 w-1 rounded-full shadow'
							style={{
								left: `${markerPosition}%`,
								transform: 'translateX(-50%)',
								backgroundColor: colors.text,
							}}
						/>
					) : null}
				</div>
				<div className='mt-2 flex justify-between text-xs' style={{ color: colors.subtle }}>
					<span>0</span>
					<span>{graphMax.toLocaleString(undefined, { maximumFractionDigits: 0 })} eDPI</span>
				</div>
			</div>

			<div className='mt-5 grid gap-2'>
				<div className='flex items-center justify-between text-sm'>
					<span className='font-semibold' style={{ color: colors.low }}>Low</span>
					<span style={{ color: colors.muted }}>Up to {range.lowMax.toLocaleString()}</span>
				</div>
				<div className='flex items-center justify-between text-sm'>
					<span className='font-semibold' style={{ color: colors.medium }}>Medium</span>
					<span style={{ color: colors.muted }}>
						{range.lowMax.toLocaleString()}–{range.mediumMax.toLocaleString()}
					</span>
				</div>
				<div className='flex items-center justify-between text-sm'>
					<span className='font-semibold' style={{ color: colors.high }}>High</span>
					<span style={{ color: colors.muted }}>Over {range.mediumMax.toLocaleString()}</span>
				</div>
			</div>
		</div>
	)
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
	const convertedEdpi =
		convertedSensitivity === null ? null : dpiValue * convertedSensitivity

	return (
		<Layout>
			<main
				className='min-h-screen px-6 py-12 sm:px-12 sm:py-16'
				style={{
					backgroundColor: colors.page,
					color: colors.text,
					backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(214, 161, 93, 0.09), transparent 55%)',
				}}
			>
				<div className='mx-auto w-full max-w-5xl'>
					<header className='mb-10 max-w-2xl'>
						<h1 className='mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl'>
							eDPI calculator
							<span
								className='ml-3 inline-block align-middle text-xs font-semibold uppercase tracking-[0.14em]'
								style={{ color: colors.subtle }}
							>
								Beta
							</span>
						</h1>
						<p className='max-w-xl text-base leading-relaxed sm:text-lg' style={{ color: colors.muted }}>
							Find your eDPI and convert your sensitivity between games while keeping the same turn distance.
						</p>
					</header>

					<section
						className='rounded-2xl border p-6 sm:p-8'
						style={{
							backgroundColor: colors.surface,
							borderColor: colors.border,
						}}
						aria-labelledby='settings-heading'
					>
						<h2 id='settings-heading' className='mb-6 text-xl font-bold'>
							Your settings
						</h2>

						<div className='grid gap-5 sm:grid-cols-2'>
							<label className='block text-sm font-medium' style={{ color: colors.muted }}>
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

							<label className='block text-sm font-medium' style={{ color: colors.muted }}>
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

							<label className='block text-sm font-medium' style={{ color: colors.muted }}>
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

							<label className='block text-sm font-medium' style={{ color: colors.muted }}>
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
							style={{ borderTop: `1px solid ${colors.border}` }}
							aria-hidden='true'
						/>

						{hasValidInputs ? (
							<div className='grid gap-5 sm:grid-cols-3' aria-live='polite'>
								<div className='border-l-2 pl-4' style={{ borderColor: colors.accent }}>
									<p className='mb-2 text-sm' style={{ color: colors.muted }}>Your eDPI</p>
									<p className='text-2xl font-bold'>
										{edpi?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
									</p>
									<p className='mt-2 text-xs' style={{ color: colors.subtle }}>DPI x sensitivity</p>
								</div>
								<div className='border-l-2 pl-4' style={{ borderColor: colors.border }}>
									<p className='mb-2 text-sm' style={{ color: colors.muted }}>
										{games[targetGame].name} sensitivity
									</p>
									<p className='break-all text-2xl font-bold'>
										{convertedSensitivity?.toLocaleString(undefined, {
											maximumFractionDigits: 4,
										})}
									</p>
									<p className='mt-2 text-xs' style={{ color: colors.subtle }}>Same cm/360 turn distance</p>
								</div>
								<div className='border-l-2 pl-4' style={{ borderColor: colors.border }}>
									<p className='mb-2 text-sm' style={{ color: colors.muted }}>Distance per 360</p>
									<p className='text-2xl font-bold'>
										{cmPer360?.toLocaleString(undefined, { maximumFractionDigits: 2 })}{' '}
										<span className='text-base font-medium' style={{ color: colors.muted }}>cm</span>
									</p>
									<p className='mt-2 text-xs' style={{ color: colors.subtle }}>At your current settings</p>
								</div>
							</div>
						) : (
							<p className='rounded-xl p-4 text-sm' style={{ backgroundColor: colors.surfaceRaised, color: colors.muted }}>
								Enter a DPI and sensitivity greater than zero to see your results.
							</p>
						)}

						<p className='mt-6 text-xs leading-relaxed' style={{ color: colors.subtle }}>
							These conversions are a work in progress. Treat the values as a starting point and fine-tune them in game.
						</p>
					</section>

					<section
						className='mt-12'
						aria-labelledby='edpi-range-heading'
					>
						<h2 id='edpi-range-heading' className='mb-2 text-xl font-bold'>
							Compare eDPI across games
						</h2>
						<p className='mb-6 text-sm' style={{ color: colors.muted }}>
							Approximate ranges are scaled separately for each game. Your converted sensitivity keeps the same turn distance.
						</p>
						<div className='grid gap-4 lg:grid-cols-2'>
							<EdpiRangeGraph
								gameId={sourceGame}
								edpi={edpi}
								heading='Current settings'
								description='Your eDPI in your current game.'
							/>
							<EdpiRangeGraph
								gameId={targetGame}
								edpi={convertedEdpi}
								heading='Converted settings'
								description={`This would be your eDPI in ${games[targetGame].name} using the converted sensitivity.`}
							/>
						</div>
						<p className='mt-4 text-xs leading-relaxed' style={{ color: colors.subtle }}>
							These are broad community-style reference points, not performance ratings. The best eDPI is the one that feels comfortable and controllable to you.
						</p>
					</section>
				</div>
			</main>
		</Layout>
	)
}

export default EdpiPage
