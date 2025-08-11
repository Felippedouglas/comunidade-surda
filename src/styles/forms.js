import styled from 'styled-components';

export const Container = styled.div`
  max-width: 420px;
  margin: 40px auto;
  padding: 20px;
  background: var(--card);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.5);
`;
export const Title = styled.h2`
  margin: 0 0 16px;
  font-size: 20px;
`;
export const Field = styled.div`
  margin-bottom: 12px;
`;
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.06);
  background: transparent;
  color: var(--text);
`;
export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 0;
  background: #2d8cff;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
export const Small = styled.small`
  display: block;
  margin-top: 8px;
  color: rgba(255,255,255,0.7);
`;
