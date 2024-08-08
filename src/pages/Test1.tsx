import React, {useState} from 'react'
import './Test1.css'
import { Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import useActionButton from '../Hook/useActionButton';

export const Test1 = () => {

  const { t } = useTranslation();
  const {  isClickedSpacial, clickedStates, handleButtonClick, handleButtonClickSpacial } = useActionButton();
  const [shapeIndices, setShapeIndices] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [isSwapped, setIsSwapped] = useState(false);
  
  const renderButton = (id: number, className: string, content: React.ReactNode) => (
    <Button
      className={`${className} ${clickedStates[`isClicked${id}` as keyof typeof clickedStates] ? 'active' : ''}`}
      onClick={() => {handleButtonClick(id); id === 1 && handleButtonClickMoveLeft(); id === 3 && handleButtonClickMoveRight();}}
    >
      {content}
    </Button>
  );

  const shapes = [
    { name: 'square', className: 'square' },
    { name: 'circle', className: 'circle' },
    { name: 'oval', className: 'oval' },
    { name: 'trapezoid', className: 'trapezoid' },
    { name: 'rectangle', className: 'rectangle' },
    { name: 'parallelogram', className: 'parallelogram' },
  ];

  const handleButtonClickMoveLeft = () => {
    setShapeIndices((prevIndices : any) =>
      prevIndices.map((index : any) => (index + 1) % shapes.length)
    );
  };


  const handleButtonClickMoveRight = () => {
    setShapeIndices((prevIndices : any) =>
      prevIndices.map((index : any) => (index - 1 + shapes.length) % shapes.length)
    );
  };

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShapeIndices(array) ;
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  const row1 = shapeIndices.slice(0, 3).map((index) => (
    <Button onClick={() => {handleButtonClick(index + 4); shuffleArray([...shapeIndices]);}} key={index} className={`custom-button ${clickedStates[`isClicked${index + 4}` as keyof typeof clickedStates] ? 'active' : ''}`}>
      <div className={`shape ${shapes[index].className}`} />
    </Button>
  ));

  const row2 = shapeIndices.slice(3).map((index) => (
    <Button onClick={() => {handleButtonClick(index + 4); shuffleArray([...shapeIndices]);}} key={index} className={`custom-button ${clickedStates[`isClicked${index + 4}` as keyof typeof clickedStates] ? 'active' : ''}`}>
      <div className={`shape ${shapes[index].className}`} />
    </Button>
  ));

  return (
    <>
      <Row className='row1'>
      <Col>
          {renderButton(1, 'custom-button', <>
            <div className='triangle-left'></div>
            <div className='name-button'>{t("move_chart")}</div>
          </>)}
        </Col>
        <Col>
          <Button className={`custom-button2 ${isClickedSpacial ? 'active2' : ''}`} onClick={() => {handleButtonClickSpacial(); handleSwap()}}>
            <div className='triangle-up'></div>
            <div className='triangle-down'></div>
            <div className='name-button'>{t("move_position")}</div>
          </Button>
        </Col>
        <Col>
          {renderButton(3, 'custom-button', <>
            <div className='triangle-right'></div>
            <div className='name-button'>{t("move_chart")}</div>
          </>)}
        </Col>
      </Row>

      <Row className='row2-1'>
        {isSwapped ? row2 : row1}
      </Row>
      <Row className='row2-2'>
        {isSwapped ? row1 : row2}
      </Row>
        {/* <Row className='row2-1'>
            {renderButton(4, 'custom-button', <div className="shape square"></div>)}
            {renderButton(5, 'custom-button', <div className="shape circle"></div>)}
            {renderButton(6, 'custom-button', <div className="shape oval"></div>)}
        </Row>
        <Row className='row2-2'>
            {renderButton(7, 'custom-button', <div className="trapezoid"></div>)}
            {renderButton(8, 'custom-button', <div className="shape rectangle"></div>)}
            {renderButton(9, 'custom-button', <div className="shape parallelogram"></div>)}
        </Row> */}
    </>
  )
}
