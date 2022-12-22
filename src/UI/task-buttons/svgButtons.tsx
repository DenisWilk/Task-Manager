import { localeEN } from '../../locales/localeEN';
import { useAppSelector } from '../../redux/hooks';

export const EditTaskSVG = () => {
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  return (
    <svg
      className="svg-icon"
      viewBox="0 0 1276.000000 1280.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{localeEN.tooltips.CHANGE_TASK[languageIndex]}</title>
      <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata>
      <g
        transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
        fill="rgba(73, 173, 73, 0.411)"
        stroke="none"
      >
        <path
          d="M11145 12790 c-302 -78 -364 -99 -510 -172 -120 -60 -213 -119 -320
-203 -44 -35 -2232 -2216 -4861 -4847 l-4782 -4783 -107 -405 c-60 -223 -116
-434 -126 -470 -26 -100 -219 -818 -236 -880 -32 -123 -44 -167 -122 -457
l-81 -302 0 -135 0 -136 136 0 135 0 302 81 c166 45 325 87 352 94 28 8 86 23
130 35 44 12 231 62 415 111 184 50 358 96 385 104 28 7 221 59 430 115 l380
101 4871 4872 c4810 4811 4872 4873 4947 4987 75 114 170 299 202 395 163 480
55 946 -313 1360 -200 225 -440 389 -687 468 -107 34 -157 44 -307 62 -136 16
-186 17 -233 5z m-230 -667 c69 -198 215 -426 398 -621 37 -40 67 -77 65 -82
-2 -4 -363 -362 -803 -795 -440 -433 -939 -926 -1110 -1094 -170 -169 -614
-606 -985 -971 -371 -365 -821 -809 -1000 -985 -179 -177 -806 -796 -1395
-1375 -1928 -1899 -2435 -2399 -2825 -2785 -1279 -1266 -1278 -1265 -1327
-1286 -71 -31 -189 -59 -247 -59 -75 0 -113 24 -170 105 -130 187 -151 289
-97 465 18 55 37 138 43 183 l11 82 4546 4548 c2500 2502 4572 4569 4604 4594
64 50 234 153 253 153 6 0 24 -35 39 -77z m774 -942 c156 -100 296 -155 438
-175 l83 -11 -30 -64 c-17 -35 -55 -102 -86 -150 -50 -77 -563 -593 -4719
-4750 l-4663 -4664 -83 -18 c-104 -23 -238 -24 -308 -3 -103 30 -168 124 -198
287 -13 76 -12 281 2 295 2 3 10 0 17 -6 10 -8 176 151 698 666 377 371 984
970 1350 1331 366 360 832 820 1035 1021 204 201 681 671 1060 1045 672 662
965 950 1695 1671 195 192 796 784 1335 1315 539 530 1274 1255 1635 1611 360
356 657 647 659 648 2 0 38 -22 80 -49z m-10547 -8670 c-10 -151 61 -332 210
-528 43 -56 123 -117 178 -134 84 -26 260 -28 323 -4 15 7 17 -2 17 -98 0
-300 120 -528 325 -617 28 -12 91 -29 142 -39 l91 -16 -666 -178 c-367 -98
-671 -177 -677 -177 -5 1 -62 62 -125 137 -63 74 -141 166 -174 204 l-58 69
187 702 c135 505 193 709 208 726 11 12 21 22 22 22 1 0 0 -31 -3 -69z"
        />
      </g>
    </svg>
  );
};
export const DoneTaskSVG = () => {
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);

  return (
    <svg className="svg-icon" viewBox="0 0 924 924">
      <title>{localeEN.tooltips.MARK_AS_DONE[languageIndex]}</title>
      <path d="M445.44 744.96l439.04-434.56c12.8-12.8 12.8-33.28 0-45.44-12.8-12.8-33.28-12.8-46.08 0l-425.6 421.12L184.96 457.6c-12.8-12.8-33.92-12.8-46.72 0-12.8 12.8-12.8 33.92 0 46.72l240 240C400 766.08 422.4 767.36 445.44 744.96z" />
    </svg>
  );
};

export const ShowTaskSVG = () => {
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  return (
    <svg
      className="svg-icon"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      enableBackground="new 0 0 32 32"
      xmlSpace="preserve"
    >
      <title>{localeEN.tooltips.SHOW_TASK[languageIndex]}</title>
      <g id="eye">
        <path
          fill="#333333"
          d="M31.965,15.776c-0.01-0.042-0.004-0.087-0.02-0.128c-0.006-0.017-0.021-0.026-0.027-0.042
		c-0.01-0.024-0.008-0.051-0.021-0.074c-2.9-5.551-9.213-9.528-15.873-9.528c-6.661,0-12.973,3.971-15.875,9.521
		c-0.013,0.023-0.011,0.05-0.021,0.074c-0.007,0.016-0.021,0.025-0.027,0.042c-0.016,0.041-0.01,0.086-0.02,0.128
		c-0.018,0.075-0.035,0.147-0.035,0.224s0.018,0.148,0.035,0.224c0.01,0.042,0.004,0.087,0.02,0.128
		c0.006,0.017,0.021,0.026,0.027,0.042c0.01,0.024,0.008,0.051,0.021,0.074c2.901,5.551,9.214,9.528,15.875,9.528
		c6.66,0,12.973-3.971,15.873-9.521c0.014-0.023,0.012-0.05,0.021-0.074c0.006-0.016,0.021-0.025,0.027-0.042
		c0.016-0.041,0.01-0.086,0.02-0.128C31.982,16.148,32,16.076,32,16S31.982,15.851,31.965,15.776z M16.023,23.988
		c-5.615,0-11.112-3.191-13.851-7.995c2.754-4.81,8.243-7.99,13.851-7.99c5.613,0,11.111,3.192,13.85,7.995
		C27.119,20.809,21.631,23.988,16.023,23.988z"
        />
        <path
          fill="#333333"
          d="M16.023,11.999c-0.002,0-0.004,0.001-0.006,0.001c-2.205,0.004-3.992,1.791-3.992,3.996
		c0,0.276,0.224,0.5,0.5,0.5c0.275,0,0.499-0.224,0.499-0.5c0-1.652,1.345-2.997,2.999-2.997v-0.001
		c0.275,0,0.498-0.224,0.498-0.499C16.521,12.222,16.299,11.999,16.023,11.999z"
        />
        <path
          fill="#333333"
          d="M16,9c-3.867,0-7,3.134-7,7c0,3.866,3.134,7,7,7c3.865,0,7-3.135,7-7C23,12.133,19.865,9,16,9z M16,22
		c-3.309,0-6-2.691-6-6c0-3.309,2.691-6,6-6c3.309,0,6,2.691,6,6C22,19.309,19.309,22,16,22z"
        />
      </g>
    </svg>
  );
};
