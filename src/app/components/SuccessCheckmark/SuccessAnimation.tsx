import { Box } from '@mui/material';
import { css, keyframes } from '@emotion/react';

const AnimationIconLineTip = keyframes`
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
`;

const AnimationIconLineLong = keyframes`0% {
    width: 0;
    right: 46px;
    top: 54px;
}
65% {
    width: 0;
    right: 46px;
    top: 54px;
}
84% {
    width: 55px;
    right: 0px;
    top: 35px;
}
100% {
    width: 47px;
    right: 8px;
    top: 38px;
}`;

const AnimationRotateCircle = keyframes`
0% {
    transform: rotate(-45deg);
}
5% {
    transform: rotate(-45deg);
}
12% {
    transform: rotate(-405deg);
}
100% {
    transform: rotate(-405deg);
}`;

const StyledCheckmark = css`
  width: 80px;
  height: 115px;
  margin: 0 auto;
`;

const StyledCheckIcon = css`
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #3b82c9;

  &::before {
    top: 3px;
    left: -2px;
    width: 30px;
    transform-origin: 100% 50%;
    border-radius: 100px 0 0 100px;
  }

  &::after {
    top: 0;
    left: 30px;
    width: 60px;
    transform-origin: 0 50%;
    border-radius: 0 100px 100px 0;
    animation: ${AnimationRotateCircle} 4.25s ease-in;
  }

  &::before,
  &::after {
    content: '';
    height: 100px;
    position: absolute;
    background: #e5ecf2;
    transform: rotate(-45deg);
  }
`;

const StyledIconLine = css`
  height: 5px;
  background-color: #3b82c9;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;

  &.line-tip {
    top: 46px;
    left: 14px;
    width: 25px;
    transform: rotate(45deg);
    animation: ${AnimationIconLineTip} 0.75s;
  }

  &.line-long {
    top: 38px;
    right: 8px;
    width: 47px;
    transform: rotate(-45deg);
    animation: ${AnimationIconLineLong} 0.75s;
  }
`;

const StlyedIconCircle = css`
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(102, 178, 255, 0.5);
`;

const StyledIconFix = css`
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: #e5ecf2;
`;

export const SuccessAnimation = () => {
  return (
    <Box>
      <div css={StyledCheckmark}>
        <div css={StyledCheckIcon}>
          <span css={StyledIconLine} className="line-tip"></span>
          <span css={StyledIconLine} className="line-long"></span>
          <div css={StlyedIconCircle}></div>
          <div css={StyledIconFix}></div>
        </div>
      </div>
    </Box>
  );
};
