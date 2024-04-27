// @ts-nocheck
import React, { useEffect, useRef, useState, forwardRef } from 'react';
import Draggable from 'react-draggable';
import './style.css';
import { getRandomId } from '@/commons/common';
import $  from 'jquery'

const DragBox = forwardRef((props, ref) => {
  const [contentOptions, setContentOptions] = useState({});
  const [dragOptions, setDragOptions] = useState({});
  const id = getRandomId()

  useEffect(() => {
    if (props.contentOptions) {
      setContentOptions(props.contentOptions);
    }

    if (props.dragOptions) {
      setDragOptions(props.dragOptions);
    }
  }, [props.dragOptions, props.contentOptions]);

  return (
    <Draggable id={id} ref={ref} {...dragOptions} handle=".d-o-drag-handler">
      <div {...contentOptions} className="d-o-draggable-box">
        <div className="d-o-drag-handler" onClick={(e) => {
              $('.d-o-drag-handler').parent().removeClass('o-h-index')
              setTimeout( () => {
                $(e.target).parent().addClass('o-h-index')
              } , 50)
        }} > </div>

        {props.children}
      </div>
    </Draggable>
  );
});

export default DragBox;
