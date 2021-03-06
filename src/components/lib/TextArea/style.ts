import styled from '../../../styled-components';
import { getInputNormalTypography } from '../../../theme/helpers';

export const NativeTextArea = styled.textarea`
    ${getInputNormalTypography}
    background: transparent;
    border: 0;
    outline: none;
    padding: 0 0.2rem;
    resize: none;
    width: ${props => props.disabled ? '17rem' : '100%'};
`;

export const ValueContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
`;
