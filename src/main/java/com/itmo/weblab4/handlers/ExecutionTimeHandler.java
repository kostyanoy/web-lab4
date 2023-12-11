package com.itmo.weblab4.handlers;

import com.itmo.weblab4.annotations.ExecutionTimeMeasured;
import com.itmo.weblab4.entities.ExecutionTimeEntity;
import com.itmo.weblab4.repos.ExecutionTimeRepository;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashSet;

@Slf4j
public class ExecutionTimeHandler implements InvocationHandler {
    private final Object bean;
    private final String beanName;
    private final HashSet<String> methods;
    private final ExecutionTimeRepository executionTimeRepository;

    public ExecutionTimeHandler(Object bean, ExecutionTimeRepository executionTimeRepository) {
        this.bean = bean;
        this.beanName = bean.getClass().getName();
        this.executionTimeRepository = executionTimeRepository;

        methods = new HashSet<>();
        Arrays.stream(bean.getClass().getDeclaredMethods())
                .filter(m -> m.isAnnotationPresent(ExecutionTimeMeasured.class))
                .forEach(m -> methods.add(m.getName()));
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if (methods.contains(method.getName())){
            return measure(method, args);
        }
        return method.invoke(bean, args);
    }

    private Object measure(Method method, Object[] args) throws InvocationTargetException, IllegalAccessException {
        log.info("Start {}", method.getName());
        long start = System.currentTimeMillis();
        Object result = method.invoke(bean, args);
        long time = System.currentTimeMillis() - start;
        log.info("End {}", method.getName());
        log.info("Time {}: {}", method.getName(), time);

        ExecutionTimeEntity tm = new ExecutionTimeEntity(beanName, method.getName(), start, time);
        executionTimeRepository.save(tm);

        return result;
    }
}
