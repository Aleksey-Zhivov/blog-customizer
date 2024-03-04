import { SyntheticEvent, useCallback, useEffect, useRef, useState, ReactNode, FormEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { OptionType, fontFamilyOptions, ArticleStateType, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { Separator } from '../separator';
import { Text } from '../text/Text';

type ArticleParamsFormProps = {
	fontFamily: (select: OptionType) => void,
	fontSize: (select: OptionType) => void,
	fontColor: (select: OptionType) => void,
	backgroundColor: (select: OptionType) => void,
	contentWidth: (select: OptionType) => void,
	resetButton: () => void,
	applyButton: (event: FormEvent) => void,
	sideBarState: ArticleStateType,
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null)
	const [open, setOpen] = useState(false);
	const elem = ref.current;

	const toggleForm = useCallback(() => {
		open === false ? setOpen(true) : setOpen(false);
	},[open])

	useEffect(() => {
		const hideSideBar = (event: MouseEvent) => {
			if (open && event.target instanceof Node && !elem?.contains(event.target)) {
				setOpen(false);
			}
		}
		document.addEventListener('mousedown', hideSideBar);
		return () => document.removeEventListener('mousedown', hideSideBar)
	}, [open])

	useEffect(() => {
		const hideSideBarByEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && open) {
				setOpen(false);
			}
		}
		document.addEventListener('keydown', hideSideBarByEsc);
		return () => document.removeEventListener('keydown', hideSideBarByEsc);
	}, [open])

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={open}/>
			<aside className = {clsx(styles.container, {[styles.container_open] : open})}>
				<form className = {styles.form} ref = {ref} onSubmit = {props.applyButton}>
					<Text 
						size = {31} 
						weight = {800} 
						uppercase 
						as = {'h3'}
						align = 'center'
					>
						Задайте параметры
					</Text>
					<Select 
						selected = {props.sideBarState.fontFamilyOption}
						options = {fontFamilyOptions}
						onChange = {props.fontFamily}
						title = 'Шрифт'/>
					<RadioGroup 
						name = 'fontSize' 
						options = {fontSizeOptions} 
						selected = {props.sideBarState.fontSizeOption}
						onChange = {props.fontSize}
						title = 'Размер шрифта'
					/>
					<Select 
						selected = {props.sideBarState.fontColor}
						options = {fontColors}
						onChange = {props.fontColor}
						title = 'Цвет шрифта'
					/>
					<Separator/>
					<Select 
						selected = {props.sideBarState.backgroundColor}
						options = {backgroundColors}
						onChange = {props.backgroundColor}
						title = 'Цвет фона'						
					/>
					<Select 
						selected = {props.sideBarState.contentWidth}
						options = {contentWidthArr}
						onChange = {props.contentWidth}
						title = 'Ширина контента'						
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button 
							title='Сбросить' 
							type='reset' 
							onClick = {props.resetButton} 
						/>
						<Button 
							title='Применить' 
							type='submit' 
						/>
					</div>
				</form>
			</aside>
		</>
	);
};