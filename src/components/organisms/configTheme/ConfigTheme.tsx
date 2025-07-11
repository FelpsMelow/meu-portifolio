import { useState } from 'react'
import { useTheme } from '../../../hooks/usetheme'
import { mapColorsToPalette } from '../../../utils/mappers/colorMappers';
import { getColorScheme } from '../../../services/colorApi'
import { ThemeColorPicker } from '../colorPicker/ColorPicker'
import { Button } from '../../atoms/button/Button';
import './ConfigTheme.scss'

export const ConfigTheme = () => {

    const {setSelectedColor, setPaletaSelecionada, paletaSelecionada} = useTheme()
    const [color, setColor] = useState<string>('');
    const [isColapse, setIsColapse] = useState(true)
    
    function handleColorPicker(newColor: string) {
        setSelectedColor(newColor)
        getColorScheme(newColor).then( (res) => {setPaletaSelecionada(mapColorsToPalette(res))})
    }

    return (
        <div className="container-config-theme">
            <header
                className={`header-config-theme ${isColapse && "header-config-theme-colapse"}`}
                style={{
                    background: paletaSelecionada.accent.hex.value,
                    color: paletaSelecionada.accent.contrast.value
                }}
            >
                <div className="container-header-icon">
                    {/* TODO - Fazer a imagem do icone de configuração mudar de cor de acordo com o tema da aplicação */}
                    <img 
                        className='header-icon'
                        src="/icons/config.svg"
                        alt="icone de configuração"
                        onClick={() => setIsColapse(!isColapse)}
                    />
                </div>
                <hr 
                    // TODO - Trocar essa tag por um átomo ou molécula existente
                    style={{
                        border: `solid 1.5px ${paletaSelecionada.accent.contrast.value}`
                    }}
                />
                <div 
                    className={`header-text ${isColapse && 'header-text-colapse'}`}
                >
                    <h2>
                        {/* TODO - Trocar por um átomo de heading */}
                        Escolha uma cor
                    </h2>
                </div>
            </header>
            <div 
                className={`config-theme-color-picker ${isColapse && 'config-theme-color-picker-colapse'}`}
                style={{
                    background: paletaSelecionada.accent.hex.value
                }}
            >
                <ThemeColorPicker onChange={setColor}/>
                <Button className='btn-config-theme' onClick={() => handleColorPicker(color)} variant='background'>
                    Aplicar cor
                </Button>
            </div>
        </div>
    )
}