import React, {
    Children,
    Component,
    Fragment,
    PureComponent,
    StrictMode,
    Suspense,
    cloneElement,
    createContext,
    createElement,
    createFactory,
    createRef,
    forwardRef,
    isValidElement,
    lazy,
    memo,
    startTransition,
    useCallback,
    useContext,
    useDebugValue,
    useDeferredValue,
    useEffect,
    useId,
    useImperativeHandle,
    useInsertionEffect,
    useLayoutEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
    useSyncExternalStore,
    useTransition,
    version,
} from "react";

import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";

export {
    BrowserRouter, Children,
    Component, Fragment, Link, Outlet, PureComponent, Route,
    Routes, StrictMode, Suspense, cloneElement,
    createContext,
    createElement,
    createFactory,
    createRef, createRoot, React as default, forwardRef, hydrateRoot, isValidElement, lazy, memo,
    startTransition, useCallback, useContext, useDebugValue,
    useDeferredValue, useEffect, useId, useImperativeHandle, useInsertionEffect, useLayoutEffect, useLocation, useMemo, useNavigate,
    useParams, useReducer, useRef, useState, useSyncExternalStore, useTransition, version
};

