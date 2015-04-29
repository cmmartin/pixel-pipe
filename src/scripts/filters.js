import greyscale from './filters/greyscale'
import sepia from './filters/sepia'
import threshold from './filters/threshold'
import brightness from './filters/brightness'
import invert from './filters/invert'
import convolute from './filters/convolute'
import opacity from './filters/opacity'

let uiControls = [
	{
		name: 'Brightness',
		transform: brightness,
		options: {
			value: 100,
			min: 0,
			max: 255
		},
		ui: 'Slider'
	},
	{
		name: 'Threshold',
		transform: threshold,
		options: {
			value: 150,
			min: 0,
			max: 255
		},
		ui: 'Slider'
	},
	{
		name: 'Greyscale',
		transform: greyscale,
		options: {}
	},
	{
		name: 'Invert',
		transform: invert,
		options: {}
	},
	{
		name: 'Sharpen',
		transform: convolute,
		options: {
			weights: [  
				0,  -1,   0,
			   -1,   5,  -1,
				0,  -1,   0 
			],
			opaque: 1
		},
		ui: 'Matrix'
	},
	{
		name: 'Blur',
		transform: convolute,
		options: {
			weights: [  
				1/9,  1/9,  1/9,
				1/9,  1/9,  1/9,
				1/9,  1/9,  1/9 
			],
			opaque: 1
		},
		ui: 'Matrix'
	},
	{
		name: 'Sepia',
		transform: sepia,
		options: {}
	},
	{
		name: 'Opacity',
		transform: opacity,
		options: {
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.01
		},
		ui: 'Slider'
	}
]

export {
	greyscale, 
	sepia,
	threshold,
	brightness, 
	invert, 
	convolute,
	opacity,
	uiControls
}