```markdown
# 문제 분석 및 해결 방안

`handleMenuClick` 함수를 `mainId = 1`, `subId = 2`로 실행했지만, `viewPosition` 값이 다시 `1,1`로 변경되어 페이지 전환이 이루어지지 않고 있습니다. 이 문제의 원인을 찾아 설명하고, 더 나은 방향으로 소스 코드를 개선하겠습니다.

## 문제의 원인

### 1. `Header.tsx`의 `useEffect`에서 `viewPosition`을 강제로 변경

`Header.tsx` 파일 내에서 다음과 같은 `useEffect` 훅이 있습니다:

```typescript
// src/components/header/Header.tsx
useEffect(() => {
  if (settingSetMenus.length > 0) {
    const [mainId, subId] = settingSetMenus[0].split('').map(Number);
    if (viewPosition.main !== mainId || viewPosition.sub !== subId) {
      dispatch(setViewSelect({ mainTab: mainId, subTab: subId }));
    }
  }
}, [dispatch, settingSetMenus, viewPosition.main, viewPosition.sub]);
```

- `settingSetMenus`가 변경될 때마다 실행되며, 첫 번째 메뉴의 `mainId`와 `subId`를 추출하여 `viewPosition`을 업데이트합니다.
- 문제는 `handleMenuClick`을 통해 이미 `viewPosition`을 `{ main: 1, sub: 2 }`로 설정했음에도, `settingSetMenus`가 변경되면 다시 `viewPosition`이 `{ main: 1, sub: 1 }`로 바뀌어 버립니다.
- 이는 페이지 전환에 필요한 상태 변경이 다시 초기화되기 때문에 페이지가 전환되지 않는 원인이 됩니다.

### 2. `settingSetMenus`의 변경과 `useEffect`의 연쇄 반응

- `Daily.tsx`에서 `initializeTabPages` 함수 내에서 `dispatch(setMenus(buttons))`를 호출합니다.
- 이는 `settingSetMenus`의 변화를 유발하며, 이에 따라 `Header.tsx`의 `useEffect`가 실행됩니다.
- 결과적으로 `handleMenuClick`으로 설정한 `viewPosition`이 `Header.tsx`의 `useEffect`에 의해 다시 덮어씌워집니다.

## 해결 방안

### 1. `Header.tsx`의 `useEffect` 조건 수정

- `useEffect`가 실행될 때마다 무조건적으로 `viewPosition`을 업데이트하는 것이 아니라, 초기 로드 시 한 번만 설정하도록 수정합니다.
- 이를 위해 컴포넌트가 마운트된 이후 첫 번째 렌더링인지 확인하는 플래그를 사용합니다.

### 2. `useRef`를 이용한 초기 렌더링 체크

```typescript
// src/components/header/Header.tsx
import React, { useEffect, useCallback, useRef } from "react";

// ...생략...

export default function Header({ paramMain }: HeaderProps) {
  // ...생략...

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (settingSetMenus.length > 0) {
        const [mainId, subId] = settingSetMenus[0].split('').map(Number);
        if (viewPosition.main !== mainId || viewPosition.sub !== subId) {
          dispatch(setViewSelect({ mainTab: mainId, subTab: subId }));
        }
      }
    }
  }, [dispatch, settingSetMenus]); // 의존성 배열에서 viewPosition 제거

  // ...생략...
}
```

- `isInitialMount.current`를 사용하여 컴포넌트가 처음 마운트될 때만 `useEffect`가 실행되도록 합니다.
- 이를 통해 `settingSetMenus`가 변경되더라도 첫 번째 렌더링 이후에는 `viewPosition`을 변경하지 않습니다.
- 의존성 배열에서 `viewPosition`을 제거하여 불필요한 실행을 방지합니다.

### 3. `Daily.tsx`에서의 초기 메뉴 설정

- 초기 메뉴 설정은 `Daily.tsx`에서 처리하는 것이 더 적절합니다.
- `Daily.tsx`에서 `initializeTabPages` 함수가 실행된 후에 초기 `viewPosition`을 설정합니다.

```typescript
// src/components/pages/Daily.tsx

useEffect(() => {
  dispatch(setIsLoading(true));

  const initializeTabPages = async () => {
    try {
      const buttons = await fetchPageSettings(dispatch, timestampToYYYYMMDD(date));
      if (buttons.length > 0) {
        dispatch(setMenus(buttons));

        // 초기 viewPosition 설정
        const [mainId, subId] = buttons[0].split('').map(Number);
        dispatch(setViewSelect({ mainTab: mainId, subTab: subId }));

        dispatch(setIsLoading(false));
      }
    } catch (error) {
      console.error("Error initializing tab pages:", error);
    }
  };

  initializeTabPages();
}, [dispatch, date]);
```

- 메뉴를 설정한 직후에 초기 `viewPosition`을 설정합니다.
- 이로써 `Header.tsx`에서 `viewPosition`을 설정할 필요가 없어집니다.

### 4. `Header.tsx`의 `useEffect` 제거 또는 단순화

- 위의 수정으로 인해 `Header.tsx`에서 `viewPosition`을 설정할 필요가 없어졌으므로, 해당 `useEffect`를 제거합니다.

```typescript
// src/components/header/Header.tsx

export default function Header({ paramMain }: HeaderProps) {
  // ...생략...

  // 이제 useEffect를 제거합니다.
  // useEffect(() => {
  //   if (settingSetMenus.length > 0) {
  //     const [mainId, subId] = settingSetMenus[0].split('').map(Number);
  //     if (viewPosition.main !== mainId || viewPosition.sub !== subId) {
  //       dispatch(setViewSelect({ mainTab: mainId, subTab: subId }));
  //     }
  //   }
  // }, [dispatch, settingSetMenus]);

  // ...생략...
}
```

- 불필요한 상태 변경을 제거하여 리렌더링을 방지합니다.

## 개선된 코드

### `Header.tsx`

```typescript
// src/components/header/Header.tsx
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setViewSelect, setSettingSelect } from "../../features/reducers/tabPageSlice";
import { setIsLoading } from "../../features/reducers/settingSlice";
import { DEFAULT_MAINLOGO_ROW_PATH, DEFAULT_LOCATION_NAME } from "../../env";
import { COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2, COLORSET_SIGNITURE_COLOR, COLORSET_HEADER_BORDER1 } from "../../static/colorSet";
import { ICON_HEADER_SETTING } from "../../static/constSet";
import { HeaderProps } from "../../static/interfaces";
import { HeaderMenus } from "./HeaderMenus";

export default function Header({ paramMain }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuClick = useCallback((mainId: number, subId: number) => {
    dispatch(setIsLoading(true));
    console.log("Header : setViewSelect", mainId, subId);
    dispatch(setViewSelect({ mainTab: mainId, subTab: subId }));
  }, [dispatch]);

  const handleGoSetting = useCallback(() => {
    console.log("Header : setViewSelect", 0, 0);
    dispatch(setViewSelect({ mainTab: 0, subTab: 0 }));
    dispatch(setSettingSelect({ mainTab: 1, subTab: 1 }));
    navigate("/settings", { state: { fromNavigate: true } });
  }, [navigate, dispatch]);

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <TopHeader>
      <TitleContainer>
        <TitleLogoContainer onClick={handleGoHome}>
          <img src={DEFAULT_MAINLOGO_ROW_PATH} style={{ width: "70%", cursor: "pointer" }} alt="main_logo" />
        </TitleLogoContainer>
        <TitleTextContainer>
          <Title>{DEFAULT_LOCATION_NAME}</Title>
        </TitleTextContainer>
      </TitleContainer>
      <MenusContainer>
        <HeaderMenus onClickCallback={handleMenuClick} isSettingsActive={paramMain === 0} />
      </MenusContainer>
      <SettingButton $enable={paramMain === 0} onClick={handleGoSetting}>
        <img src={`${ICON_HEADER_SETTING}`} alt="settings" />
      </SettingButton>
    </TopHeader>
  );
}

// ...스타일 코드 생략...
```

- `useEffect`를 제거하고, `paramMain`을 직접 활용하도록 수정했습니다.

### `Daily.tsx`

```typescript
// src/components/pages/Daily.tsx

useEffect(() => {
  dispatch(setIsLoading(true));

  const initializeTabPages = async () => {
    try {
      const buttons = await fetchPageSettings(dispatch, timestampToYYYYMMDD(date));
      if (buttons.length > 0) {
        dispatch(setMenus(buttons));

        // 초기 viewPosition 설정
        const [mainId, subId] = buttons[0].split('').map(Number);
        dispatch(setViewSelect({ mainTab: mainId, subTab: subId }));

        dispatch(setIsLoading(false));
      }
    } catch (error) {
      console.error("Error initializing tab pages:", error);
    }
  };

  initializeTabPages();
}, [dispatch, date]);

// ...생략...
```

- 초기 메뉴 로딩 시 `viewPosition`을 설정하여 이후에 변경되지 않도록 합니다.

### `HeaderMenus.tsx`

- `HeaderMenus.tsx`는 변경 없이 그대로 사용해도 됩니다.

## 결론

- 문제의 원인은 `Header.tsx`의 `useEffect`가 메뉴 변경 시마다 `viewPosition`을 초기화하여 사용자 입력을 덮어쓰는 것이었습니다.
- 이를 해결하기 위해 `viewPosition`의 초기 설정을 `Daily.tsx`에서 한 번만 수행하고, `Header.tsx`에서는 `viewPosition`을 변경하지 않도록 수정했습니다.
- 이러한 수정으로 `handleMenuClick`을 통한 메뉴 변경이 정상적으로 동작하며, 페이지 전환이 이루어집니다.

# 추가 참고 사항

- **상태 관리의 일관성 유지**: 전역 상태를 변경하는 액션은 가능한 중앙에서 관리하고, 여러 컴포넌트에서 동일한 상태를 중복으로 변경하지 않도록 주의해야 합니다.
- **`useEffect` 사용 시 의존성 배열 관리**: 의존성 배열에 포함된 값들이 변경될 때마다 `useEffect`가 실행되므로, 필요하지 않은 실행을 방지하기 위해 의존성 배열을 신중하게 설정해야 합니다.
- **초기 로딩과 사용자 인터랙션 구분**: 초기 로딩 시 설정해야 하는 값들과 사용자 인터랙션에 의해 변경되는 값들을 명확히 구분하여 상태 관리 로직을 구성하는 것이 중요합니다.

# 마무리

제안된 수정 사항을 적용하면 `handleMenuClick`을 통한 메뉴 변경이 의도대로 동작하며, 페이지 전환이 정상적으로 이루어집니다. 상태 관리에서의 작은 차이가 큰 문제를 일으킬 수 있으므로, 상태 변경 로직을 신중히 다루는 것이 중요합니다.
```